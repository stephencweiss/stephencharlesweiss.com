---
title: 'Preview Uploaded Files In HTML Forms'
date: '2020-04-14'
publish: '2020-05-11'
category: ['programming']
tags: ['forms', 'file preview', 'preview', 'URL.createObjectURL']
---

Recently, I've been exploring Cloudinary's API and thinking about different ways to take advantage of their service.

The example I've been building on is a form where the user uploads an image.

Now that that they've selected an image, I want to allow them to preview it before submitting.

In writing about uploading images To Cloudinary, I noted that the [JSON response from Cloudinary includes a URL to the image](../../2020-05-07/uploading-images-to-cloudinary/#listen-for-and-store-cloudinarys-response).

This makes conditionally rendering the preview image a matter of short-circuiting (see my previous post for more on [conditionally rendering in React](../../2019-10-26/conditional-render-react-basic/)).

In this example, we're using the `CreateItem` component originally written for [uploading images to Cloudinary](../../2020-05-07/uploading-images-to-cloudinary/):

```javascript:title=CreateItemForm.js
export class CreateItem extends React.Component {
    state = {
        /*...*/
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="Upload an image"
                        required
                        onChange={this.handleImageUpload}
                    />
                    {this.state.image && (
                        <img
                            src={this.state.image}
                            width={200}
                            alt="Upload Preview"
                        />
                    )}
                </label>
            </form>
        )
    }
}
```

But wait, in a follow up article, I chose to defer uploading images to Cloudinary as long as possible to avoid unnecessary / wasteful network usage.

Does this mean that there's no way to offer a preview of an uploaded file? Fortunately, the answer's no!

Stack Overflow provides some excellent answers in this conversation on [Previewing an image before it's uploaded]()

My [preferred answer](https://stackoverflow.com/a/27165977) comes from [@nkron](https://stackoverflow.com/users/977809/nkron):

> There are a couple ways you can do this. The most efficient way would be to use [URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) on the [File](http://www.javascripture.com/File) from your [<input>](http://www.javascripture.com/HTMLInputElement#files). Pass this URL to [img.src](http://www.javascripture.com/HTMLImageElement#src) to tell the browser to load the provided image.

(This is actually a similar approach I used previously to [create downloadable files](../../2019-11-07/creating-a-downloadable-file).)

Let's put this into practice by modifying the `CreateItem` class we defined [here](../../2020-05-10/defer-upload-to-cloudinary).

Add a `tempUrl` property to state within our `handleImageUpload` function.<sup>1</sup>

Once that's saved, we can point to that URL to render the image.

```javascript:title=CreateItemForm.js
export class CreateItem extends React.Component {
    state = {
        /*...*/
    }
    handleImageUpload = (event) => {
        const { files } = event.target
        const tempUrl = URL.createObjectURL(files[0]) //highlight-line
        this.setState({ files, tempUrl })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="Upload an image"
                        required
                        onChange={this.handleImageUpload}
                    />
                    {this.state.image && (
                        <img
                            src={this.state.tempUrl} //highlight-line
                            width={200}
                            alt="Upload Preview"
                        />
                    )}
                </label>
            </form>
        )
    }
}
```

As [@tfmontague](https://stackoverflow.com/users/1404726/tfmontague) points out, this URL is temporary: it's saved in the browser cache and should not be treated as a persistent location. Keeping the file around helps to make sure that when we're ready to submit we are able to save the actual file.

## Footnotes

-   <sup>1</sup> This could be modified to handle multiple images, but that's beyond the scope of what I'm trying to achieve here and would add considerable complexity. I leave it to you (or my future self) to figure that out as needed.
