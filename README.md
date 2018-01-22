

# EasyAJAX jQuery Plugin

An incredibly useful jQuery plugin to implement AJAX loading / form submission into any website or app, with full support for CSRF tokens. EasyAJAX uses HTML markup and tags to add AJAX to any link / form. 

Check out the **[demo](#)** to see it in action!
### Installation
Make sure you have the latest version of jQuery installed and called before this plugin. Insert the following into your `<head>` tag, just like any other jQuery script.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="js/jquery.easyajax.min.js"></script>
```
### Activate a link
To turn a enable AJAX on a html element use the `ajax-enable` as shown below:

```html
<a href="#" ajax-enable id="about">About Me</a>
<!-- or -->
<span ajax-enable class="dropdown_carat"></a>
```
This tag can be used on any element, but remember it will make the entire element clickable, so be careful about using it on large elements. 

**Note**: For `<a>` tags the HREF value will be disabled so long as Javascript is on, but it's always best practice to include a working link to the content you're linking to if AJAX fails for whatever reason.

We do need some more parameters in order to actually make the link clickable. 

### Parameters
Here's a list of all the supported parameters and their purpose:


| Parameter | Action | Accepts Value |
|-----|-----|-----|
| `ajax-enable` | Enables EasyAJAX plugin on element |*No*
| `ajax-action` |  The URL of the POST action | *Yes*
| `ajax-success` | Action for success event |*Yes*
| `ajax-container` | Instructs where to place HTML results |*Yes*
| `[ajax-container-default]` |  If no `ajax-container` is specified, use this once on the default DIV for results on this page | *No*
| `csrf-token` |  Field for CSRF token | *Yes*



We'll go through each of these individually below, but first here's a little about how forms are handled.

### Forms
You need not worry about mapping any variables to your form elements manually. EasyAJAX automatically gathers the necessary form data and sends it to the URL you specified through the `ajax-action` variable.

The data is stored as a jQuery object, if you're not familiar with those, think of them like an array... that can have arrays within arrays. **Arrayception**.

Arrays have two elements, a **key** and a **value**.

    {key: value, key: value, key: value}

Here's an example of how our data is saved:

    {
    ajaxAction: "/path/to/php",
    ajaxSuccess: "msg",
    _token: "Kq7bNXtT4MfxIYg9xsxPIYoK03aqwnk0HktH2eeR"
    formElements: {
				   "nameField": "Jamie Pine",
				   "ageField": 22,
				   "isAwesomeField": true,
				  }
    }
As you can see the `formElements` **key** has a **value** that is an array. Obviously regular links will not have a `formElements` field so this conveniently won't show up unless you're using a form. 

### CSRF Tokens

The `_token` value is the CSRF token. If you don't know what a CSRF token is, this probably won't matter to you, but I recommend you look it up. It's a pretty important security measure needed when submitting POST requests. The name **_token** lines up with PHP framework Laravel's expectations for what the CSRF token should be called, so if you're using that this'll work a treat. If you need to change the name, I'll implement an option to do that soon, for now just find change it in the the plugin JS file.

### Actions
Using the `ajax-action` tag, choose from a set of preset actions or create your own through jQuery.

Usage: `ajax-action="load"`


| Parameter | Action |
|-----|-----|
| `load` | Inserts server response as HTML inside the  `ajax-container` HTML tag (eg. div, main, #container)
| `msg` |  Displays an inline alert box at the `ajax-container` 
| `custom` | Create your own success action (see below) 

**Custom Actions**

Create a custom action by pasting this script just before your `</body>` tag.
```javascript
ajaxCustomAction(id) {

}
```
**Results Containers**
There are several ways to specify a container to append the server response to, whether you're displaying a success message or loading in an entire page through AJAX. 

The first way is to specify the `ajax-container` directly on the link like so:
```html
<a href="#" ajax-enable ajax-container="#main" id="about">About Me</a>
```
The second way 

**PHP Examples**

**PHP Examples**
    

