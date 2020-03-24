# Xamltoy

XamlToy is our online editor for XAML compatible with [NoesisGUI](https://www.noesisengine.com/). You can try it live at [xamltoy.noesisengine.com](https://xamltoy.noesisengine.com).

XamlToy was created to easily share XAML snippets. It is being used in release notes to showcase new features, in our tracker to report issues or just to share cool things at our forums. Just a few examples:

* https://www.noesisengine.com/xamltoy/2e4fb7d5143b4505992b33fec34d0592
* https://www.noesisengine.com/xamltoy/012449ce12e6c2ad5cfa09020add4791
* https://www.noesisengine.com/xamltoy/e4c6986363164dabcb6e0ea8d8d96265
* https://www.noesisengine.com/xamltoy/8ab948fb3b5a3edaaee5bb6cd7017a8b

![Screenshoot](https://raw.githubusercontent.com/Noesis/Noesis.github.io/master/NoesisGUI/XamlToy/Shadow.png)

## Sharing Guide

Xamltoy uses GitHub [gists](https://gist.github.com/) to publicly share your creations.

The gist must contain a file named *Main.xaml*. It can also contain extra resources like images, fonts and dictionaries. Those extra resources are referenced as being as the same directory than *Main.xaml*. For example:

```
<Button FontFamily="./#Aero Matics" FontSize="24" Background="#FF124C7A" Content="Button"/>
```

To share a xaml with others you should do the following:

* Create a gist with *Main.xaml* and any other extra resources you may need.
* Append the gist ID to XamlToy URL. For example, to view [gist.github.com/2e4fb7d5143b4505992b33fec34d0592](https://gist.github.com/2e4fb7d5143b4505992b33fec34d0592) in XamlToy, use the URL [www.noesisengine.com/xamltoy/2e4fb7d5143b4505992b33fec34d0592](https://www.noesisengine.com/xamltoy/2e4fb7d5143b4505992b33fec34d0592).

Some example gists:

* [gist.github.com/7899ac1bd7ba837db023409bc0f43c3f](https://gist.github.com/7899ac1bd7ba837db023409bc0f43c3f)
* [gist.github.com/44229263f9a6c22624d1f7e993f34bf4](https://gist.github.com/7899ac1bd7ba837db023409bc0f43c3f)
* [gist.github.com/61c071a0b3a34ff82dfb0e2b96e30f94](https://gist.github.com/7899ac1bd7ba837db023409bc0f43c3f)
* [gist.github.com/29a81720a5a5daa66725429966240a60](https://gist.github.com/7899ac1bd7ba837db023409bc0f43c3f)

Happy sharing!

## Feedback

Please use our [forums](https://forums.noesisengine.com/) for bug reports and feature requests