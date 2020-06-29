---
title: 'Uploading Images To Cloudinary: Deferring Until Necessary'
date: '2020-04-14'
publish: '2020-05-10'
category: ['programming']
tags: ['cloudinary', 'composition', 'optimization', 'api call']
---

Recently, I wrote about how to upload an image to Cloudinary from the client using unsigned requests.

I noted that saving immediately upon selection had some benefits, but one big cost: a file was _always_ uploaded to Cloudinary, regardless of whether or not it was ultimately saved with our form.

> At this point, we've set up a form to accept a file, sent that file off to Cloudinary for storage, and then saved the URL to State so that upon form submission, it'll be accessible for saving along with the rest of our profile.
>
> In the future, I might move a lot of this logic to the backend. The biggest benefit being that I would have greater control over _what_ is saved to Cloudinary and _when_. Right now, the logic is such that any image uploaded is saved to Cloudinary _even if the form is never submitted_.

Without shifting to a totally separate paradigm (i.e., moving this workload to the server), I decided to explore how I could avoid that one issue.

Initially, the steps were:

1. Save the file to Cloudinary and store the URLs
2. Use the URLs when the form is submitted.

By inverting the first step, we can achieve the following:

1. Save the file that's uploaded to the component's state
2. Upon submission, process the image first to retrieve the URLs we needed
3. Once that's complete proceed with the file submission.

Let's see how that might look.

Originally, `handleImageUpload` was part of our `CreateItem` class component and did all of the heavy lifting:

```javascript:title=CreateItem.js
class CreateItem extends Component {
    /*...*/
    handleImageUpload = (event) => {
        const data = new FormData()
        const { files } = event.target
        data.append('file', files[0])
        data.append('upload_preset', 'my_upload_preset')
        fetch('https://api.cloudinary.com/v1_1/myCloudinaryUser/auto/upload', {
            method: 'POST',
            body: data,
        })
            .then((res) => res.json())
            .then((file) =>
                this.setState({
                    image: file.secure_url,
                    largeImage: file.eager[0].secure_url,
                })
            )
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        accept={'image/*'}
                        onChange={this.handleImageUpload}
                    />
                </label>
                {/*...*/}
            </form>
        )
    }
}
```

Splitting it into two functions, I came up with the following:

```javascript:title=CreateItem.js
class CreateItem extends Component {
    /*...*/
    handleImageUpload = (event) => {
        const { files } = event.target
        this.setState({ files: files })
    }

    saveImageToCloudinary = async () => {
        const data = new FormData()
        data.set('file', this.state.files[0])
        data.set('upload_preset', 'my_upload_preset')
        await fetch(
            'https://api.cloudinary.com/v1_1/myCloudinaryUser/auto/upload',
            {
                method: 'POST',
                body: data,
            }
        )
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    image: data.secure_url,
                    largeImage: data.eager[0].secure_url,
                })
            })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        accept={'image/*'}
                        onChange={this.handleImageUpload}
                    />
                </label>
                {/*...*/}
            </form>
        )
    }
}
```

Notice, `saveImageToCloudinary` is identical (except that it's now `async`, more on that in a second) to our original `handleImageUpload` and `handleImageUpload` is now simply a state setter.

How does that help?

Well, let's now _call_ `saveImageToCloudinary` only upon submission<sup>[1](#footnotes)</sup>:

```javascript:title=CreateItem.js
class CreateItem extends Component {
    /*...*/
    handleSubmit = async (event, createItem) => {
        event.preventDefault()
        await this.saveImageToCloudinary() // upload file to Cloudinary, await the response
        const res = await createItem() // create the item on the data base
        // redirect to the new item's page
        Router.push({
            pathname: '/item',
            query: { id: res.data.createItem.id },
        })
    }
    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (
                    <form onSubmit={() => this.handleSubmit(event, createItem)}>
                        {/*...*/}
                    </form>
                )}
            </Mutation>
        )
    }
}
```

## Conclusion

There's still further optimizations available, but these changes at least prevent unnecessary calls to Cloudinary. It does, however, extend the time perceived to create an item by including a second round trip at the time of submission.

Whereas previously, by the time we hit submit it's likely that Cloudinary had already resolved, and so we could simply write to our server, now that Cloudinary request is deferred until the last possible moment.

As with all things - there are trade offs. In this case, eliminating unnecessary calls feels worth it, but I'm always open to reevaluating in light of new information!

## Footnotes

-   <sup>[1](#fn1)</sup> The form is now wrapped in a `Mutation` component - this comes from Apollo, and it's using a render prop to return our form. These details are less important for the purposes of this post, however, I wrote previously about [Apollo and render props](../../2020-05-05/querying-apollo-renderprops-vs-hooks) and [querying apollo with variables](../../2020-05-06/querying-apollo-passing-arguments).
