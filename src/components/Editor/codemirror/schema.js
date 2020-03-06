let Schema = {
  "!top": [
    "Canvas", "StackPanel", "WrapPanel", "DockPanel", "Grid", "UniformGrid",
    "Control", "ContentControl", "UserControl", "Page", "HeaderedContentControl",
    "Border"
  ],
  "!attrs": {
    "xmlns:i": ["http://schemas.microsoft.com/expression/2010/interactivity"],
    "xmlns:ei": ["http://schemas.microsoft.com/expression/2010/interactions"],
    "xmlns:noesis": ["clr-namespace:NoesisGUIExtensions;assembly=Noesis.GUI.Extensions"],
    "xmlns:sys": ["clr-namespace:System;assembly=mscorlib"],
    "x:Name": null,
    "x:Key": null
  },
  "!attached": {
    'noesis:Element': {
      Transform3D: "noesis:Transform3D",
      SupportsFocusEngagement: ["True", "False"],
      IsFocusEngagementEnabled: ["True", "False"],
      IsFocusEngaged: ["True", "False"],
      PPAAMode: ["Default", "Disabled"]
    },
    'noesis:Text': {
      Stroke: "Brush",
      StrokeThickness: null
    },
    'noesis:Path': {
      TrimStart: null,
      TrimEnd: null,
      TrimOffset: null
    },
    'noesis:StyleInteraction': {
      Behaviors: "noesis:StyleBehaviorCollection",
      Triggers: "noesis:StyleTriggerCollection"
    },
    'i:Interaction': {
      Behaviors: "i:Behavior",
      Triggers: "i:TriggerBase"
    },
    TextElement: {
      Background: "Brush",
      FontFamily: null,
      FontSize: null,
      FontStretch: ["UltraCondensed", "ExtraCondensed", "Condensed", "SemiCondensed", "Normal", "Medium", "SemiExpanded", "Expanded", "ExtraExpanded", "UltraExpanded"],
      FontStyle: ["Normal", "Oblique", "Italic"],
      FontWeight: ["Thin", "ExtraLight", "UltraLight", "Light", "SemiLight", "Normal", "Regular", "Medium", "DemiBold", "SemiBold", "Bold", "ExtraBold", "UltraBold", "Black", "Heavy", "ExtraBlack", "UltraBlack"],
      Foreground: "Brush",
    },
    Panel: {
      ZIndex: null
    },
    Canvas: {
      Bottom: null,
      Left: null,
      Right: null,
      Top: null
    },
    DockPanel: {
      Dock: ["Left", "Top", "Right", "Bottom"]
    },
    Grid: {
      Column: null,
      ColumnSpan: null,
      IsSharedSizeScope: ["True", "False"],
      Row: null,
      RowSpan: null
    },
    VirtualizingPanel: {
      CacheLength: null,
      CacheLengthUnit: ["Pixel", "Item", "Page"],
      IsContainerVirtualizable: ["True", "False"],
      IsVirtualizing: ["True", "False"],
      ScrollUnit: ["Pixel", "Item"],
      VirtualizationMode: ["Standard", "Recycling"]
    },
    ScrollViewer: {
      CanContentScroll: ["True", "False"],
      HorizontalScrollBarVisibility: ["Disabled", "Auto", "Hidden", "Visible"],
      VerticalScrollBarVisibility: ["Disabled", "Auto", "Hidden", "Visible"],
      IsDeferredScrollingEnabled: ["True", "False"],
      PanningMode: ["Both", "HorizontalFirst", "HorizontalOnly", "None", "VerticalFirst", "VerticalOnly"],
      PanningDeceleration: null,
      PanningRatio: null
    },
    ItemsControl: {
      AlternationIndex: null
    },
    Selector: {
      IsSelected: ["True", "False"]
    },
    ToolBar: {
      IsOverflowItem: ["True", "False"],
      OverflowMode: ["AsNeeded", "Always", "Never"]
    },
    ToolBarTray: {
      IsLocked: ["True", "False"]
    }
  },
  ResourceDictionary: {
    children: ["FrameworkTemplate", "Brush", "Transform", "Geometry", "UIElement"]
  },
  UIElement: {
    attrs: {
      AllowDrop: ["True", "False"],
      Clip: "Geometry",
      ClipToBounds: ["True", "False"],
      Focusable: ["True", "False"],
      IsEnabled: ["True", "False"],
      IsHitTestVisible: ["True", "False"],
      IsManipulationEnabled: ["True", "False"],
      OpacityMask: "Brush",
      Opacity: null,
      RenderTransformOrigin: null,
      RenderTransform: "Transform",
      Transform3D: "noesis:Transform3D",
      Visibility: ["Collapsed", "Hidden", "Visible"]
    }
  },
  FrameworkElement: {
    attrs: {
      Cursor: [
        "None", "No", "Arrow", "AppStarting", "Cross", "Help", "IBeam", "SizeAll", "SizeNESW", "SizeNS", "SizeNWSE", "SizeWE", "UpArrow", "Wait", "Hand", "Pen",
        "ScrollNS", "ScrollWE", "ScrollAll", "ScrollN", "ScrollS", "ScrollW", "ScrollE", "ScrollNW", "ScrollNE", "ScrollSW", "ScrollSE", "ArrowCD"
      ],
      DataContext: null,
      DefaultStyleKey: null,
      FocusVisualStyle: "Style",
      ForceCursor: ["True", "False"],
      Height: null,
      HorizontalAlignment: ["Left", "Right", "Center", "Stretch"],
      InputScope: [
        "Default", "Url", "FullFilePath", "FileName", "EmailUserName", "EmailSmtpAddress", "LogOnName", "PersonalFullName", "PersonalNamePrefix", "PersonalGivenName",
        "PersonalMiddleName", "PersonalSurname", "PersonalNameSuffix", "PostalAddress", "PostalCode", "AddressStreet", "AddressStateOrProvince", "AddressCity",
        "AddressCountryName", "AddressCountryShortName", "CurrencyAmountAndSymbol", "CurrencyAmount", "Date", "DateMonth", "DateDay", "DateYear", "DateMonthName",
        "DateDayName", "Digits", "Number", "OneChar", "Password", "TelephoneNumber", "TelephoneCountryCode", "TelephoneAreaCode", "TelephoneLocalNumber", "Time",
        "TimeHour", "TimeMinorSec", "NumberFullWidth", "AlphanumericHalfWidth", "AlphanumericFullWidth", "CurrencyChinese", "Bopomofo", "Hiragana", "KatakanaHalfWidth",
        "KatakanaFullWidth", "Hanja", "PhraseList", "RegularExpression", "Srgs", "Xml"
      ],
      LayoutTransform: "Transform",
      Margin: null,
      MaxHeight: null,
      MaxWidth: null,
      MinHeight: null,
      MinWidth: null,
      Name: null,
      OverridesDefaultStyle: ["True", "False"],
      Style: "Style",
      Tag: null,
      ToolTip: null,
      UseLayoutRounding: ["True", "False"],
      VerticalAlignment: ["Top", "Bottom", "Center", "Stretch"],
      Width: null,
      Resources: "ResourceDictionary",
      Triggers: "TriggerBase"
    },
    base: "UIElement"
  },
  TextBlock: {
    attrs: {
      Background: "Brush",
      FontFamily: null,
      FontSize: null,
      FontStretch: ["UltraCondensed", "ExtraCondensed", "Condensed", "SemiCondensed", "Normal", "Medium", "SemiExpanded", "Expanded", "ExtraExpanded", "UltraExpanded"],
      FontStyle: ["Normal", "Oblique", "Italic"],
      FontWeight: ["Thin", "ExtraLight", "UltraLight", "Light", "SemiLight", "Normal", "Regular", "Medium", "DemiBold", "SemiBold", "Bold", "ExtraBold", "UltraBold", "Black", "Heavy", "ExtraBlack", "UltraBlack"],
      Foreground: "Brush",
      Inlines: "Inline",
      LineHeight: null,
      LineStackingStrategy: ["BlockLineHeight","MaxHeight"],
      Padding: null,
      TextAlignment: ["Left", "Center", "Right", "Stretch"],
      TextDecorations: ["None", "Overline", "Baseline", "Underline", "Strikethrough"],
      Text: null,
      TextTrimming: ["None", "CharacterEllipsis", "WordEllipsis"],
      TextWrapping: ["NoWrap", "Wrap", "WrapWithOverflow"]
    },
    base: "FrameworkElement",
    children: ["Inline"]
  },
  TextElement: {
    type: "abstract",
    attrs: {
      Background: "Brush",
      FontFamily: null,
      FontSize: null,
      FontStretch: ["UltraCondensed", "ExtraCondensed", "Condensed", "SemiCondensed", "Normal", "Medium", "SemiExpanded", "Expanded", "ExtraExpanded", "UltraExpanded"],
      FontStyle: ["Normal", "Oblique", "Italic"],
      FontWeight: ["Thin", "ExtraLight", "UltraLight", "Light", "SemiLight", "Normal", "Regular", "Medium", "DemiBold", "SemiBold", "Bold", "ExtraBold", "UltraBold", "Black", "Heavy", "ExtraBlack", "UltraBlack"],
      Foreground: "Brush"
    }
  },
  Inline: {
    type: "abstract",
    attrs: {},
    base: "TextElement"
  },
  LineBreak: {
    attrs: {},
    base: "Inline"
  },
  Run: {
    attrs: {
      Text: null
    },
    base: "Inline"
  },
  Span: {
    attrs: {
      Inlines: "Inline",
    },
    base: "Inline",
    children: ["Inline"]
  },
  Bold: {
    attrs: {},
    base: "Span"
  },
  Italic: {
    attrs: {},
    base: "Span"
  },
  Underline: {
    attrs: {},
    base: "Span"
  },
  Hyperlink: {
    attrs: {
      Command: null,
      CommandParameter: null,
      CommandTarget: "UIElement",
      NavigateUri: null,
      TargetName: null
    },
    base: "Span"
  },
  ItemsPresenter: {
    base: "FrameworkElement"
  },
  Panel: {
    type: "abstract",
    attrs: {
      Background: "Brush",
      IsItemsHost: ["True", "False"],
      Children: "UIElement"
    },
    base: "FrameworkElement",
    children: ["UIElement"]
  },
  Canvas: {
    attrs: {},
    base: "Panel"
  },
  StackPanel: {
    attrs: {
      Orientation: ["Horizontal", "Vertical"]
    },
    base: "Panel"
  },
  WrapPanel: {
    attrs: {
      ItemWidth: null,
      ItemHeight: null,
      Orientation: ["Horizontal", "Vertical"]
    },
    base: "Panel"
  },
  DockPanel: {
    attrs: {
      LastChildFill: ["True", "False"]
    },
    base: "Panel"
  },
  Grid: {
    attrs: {},
    base: "Panel"
  },
  UniformGrid: {
    attrs: {},
    base: "Panel"
  },
  VirtualizingPanel: {
    type: "abstract",
    attrs: {},
    base: "Panel"
  },
  VirtualizingStackPanel: {
    attrs: {
      Orientation: ["Horizontal", "Vertical"]
    },
    base: "VirtualizingPanel"
  },
  Decorator: {
    attrs: {
      Child: "UIElement"
    },
    base: "FrameworkElement",
    children: ["UIElement"]
  },
  AdornerDecorator: {
    attrs: {},
    base: "Decorator"
  },
  BulletDecorator: {
    attrs: {
      Background: "Brush",
      Bullet: "UIElement"
    },
    base: "Decorator"
  },
  Border: {
    attrs: {
      Background: "Brush",
      BorderBrush: "Brush",
      BorderThickness: null,
      CornerRadius: null,
      Padding: null
    },
    base: "Decorator"
  },
  Viewbox:  {
    attrs: {
      Child: "UIElement",
      Stretch: ["None", "Fill", "Uniform", "UniformToFill"],
      StretchDirection: ["UpOnly", "DownOnly", "Both"]
    },
    base: "FrameworkElement"
  },
  Popup: {
    attrs: {
      AllowsTransparency: ["True", "False"],
      Child: "UIElement",
      HasDropShadow: ["True", "False"],
      HorizontalOffset: null,
      IsOpen: ["True", "False"],
      Placement: ["Absolute", "Relative", "Bottom", "Center", "Right", "AbsolutePoint", "RelativePoint", "Mouse", "MousePoint", "Left", "Top", "Custom"],
      PlacementRectangle: null,
      PlacementTarget: "UIElement",
      PopupAnimation: ["None", "Fade", "Slide", "Scroll"],
      StaysOpen: ["True", "False"],
      VerticalOffset: null
    }
  },
  Image: {
    attrs: {
      Source: "ImageSource",
      Stretch: ["None", "Fill", "Uniform", "UniformToFill"],
      StretchDirection: ["UpOnly", "DownOnly", "Both"]
    },
    base: "FrameworkElement"
  },
  ContentPresenter: {
    attrs: {
      Content: "UIElement",
      ContentSource: null,
      ContentTemplate: "DataTemplate",
      ContentTemplateSelector: null
    },
    base: "FrameworkElement",
    children: ["UIElement"]
  },
  Control: {
    attrs: {
      Background: "Brush",
      BorderBrush: "Brush",
      BorderThickness: null,
      FontFamily: null,
      FontSize: null,
      FontStretch: ["UltraCondensed", "ExtraCondensed", "Condensed", "SemiCondensed", "Normal", "Medium", "SemiExpanded", "Expanded", "ExtraExpanded", "UltraExpanded"],
      FontStyle: ["Normal", "Oblique", "Italic"],
      FontWeight: ["Thin", "ExtraLight", "UltraLight", "Light", "SemiLight", "Normal", "Regular", "Medium", "DemiBold", "SemiBold", "Bold", "ExtraBold", "UltraBold", "Black", "Heavy", "ExtraBlack", "UltraBlack"],
      Foreground: "Brush",
      HorizontalContentAlignment: ["Left", "Center", "Right", "Stretch"],
      IsTabStop: ["True", "False"],
      Padding: null,
      TabIndex: null,
      Template: "ControlTemplate",
      VerticalContentAlignment: ["Top", "Center", "Bottom", "Stretch"],
      IsFocusEngaged: ["True", "False"],
      IsFocusEngagementEnabled: ["True", "False"]
    },
    base: "FrameworkElement"
  },
  ContentControl: {
    attrs: {
      Content: "UIElement",
      ContentStringFormat: null,
      ContentTemplate: "DataTemplate",
      ContentTemplateSelector: null
    },
    base: "Control",
    children: ["UIElement"]
  },
  ItemsControl: {
    attrs: {
      AlternationCount: null,
      DisplayMemberPath: null,
      ItemContainerStyle: "Style",
      ItemsPanel: "ItemsPanelTemplate",
      ItemsSource: null,
      ItemTemplate: "DataTemplate",
      ItemTemplateSelector: null
    },
    base: "Control"
  },
  HeaderedContentControl: {
    attrs: {
      Header: "UIElement",
      HeaderStringFormat: null,
      HeaderTemplate: "DataTemplate",
      HeaderTemplateSelector: null
    },
    base: "ContentControl",
    children: ["UIElement"]
  },
  HeaderedItemsControl: {
    attrs: {
      Header: "UIElement",
      HeaderStringFormat: null,
      HeaderTemplate: "DataTemplate",
      HeaderTemplateSelector: null
    },
    base: "ItemsControl"
  },
  UserControl: {
    attrs: {},
    base: "ContentControl",
  },
  Page: {
    attrs: {
      Title: null
    },
    base: "UserControl"
  },
  ToolTip: {
    attrs: {
      HasDropShadow: ["True", "False"],
      HorizontalOffset: null,
      IsOpen: ["True", "False"],
      Placement: ["Absolute", "Relative", "Bottom", "Center", "Right", "AbsolutePoint", "RelativePoint", "Mouse", "MousePoint", "Left", "Top", "Custom"],
      PlacementRectangle: null,
      PlacementTarget: "UIElement",
      StaysOpen: ["True", "False"],
      VerticalOffset: null
    },
    base: "ContentControl"
  },
  Label: {
    attrs: {},
    base: "ContentControl"
  },
  ButtonBase: {
    type: "abstract",
    attrs: {
      ClickMode: null,
      Command: null,
      CommandParameter: null,
      CommandTarget: "UIElement"
    },
    base: "ContentControl"
  },
  Button: {
    attrs: {},
    base: "ButtonBase"
  },
  ToggleButton: {
    attrs: {
      IsChecked: ["True", "False", "{x:Null}"],
      IsThreeState: ["True", "False"]
    },
    base: "ButtonBase"
  },
  CheckBox: {
    attrs: {},
    base: "ToggleButton"
  },
  RadioButton: {
    attrs: {
      GroupName: null
    },
    base: "ToggleButton"
  },
  TextBoxBase: {
    type: "abstract",
    attrs: {
      AcceptsReturn: ["True", "False"],
      AcceptsTab: ["True", "False"],
      CaretBrush: "Brush",
      HorizontalScrollBarVisibility: ["Disabled", "Auto", "Hidden", "Visible"],
      IsReadOnly: ["True", "False"],
      SelectionBrush: "Brush",
      SelectionOpacity: null,
      VerticalScrollBarVisibility: ["Disabled", "Auto", "Hidden", "Visible"]
    },
    base: "Control"
  },
  TextBox: {
    attrs: {
      CaretIndex: null,
      MaxLength: null,
      MaxLines: null,
      SelectedText: null,
      SelectionLength: null,
      SelectionStart: null,
      TextAlignment: ["Left", "Right", "Center", "Justify"],
      Text: null,
      TextWrapping: ["NoWrap", "Wrap", "WrapWithOverflow"]
    },
    base: "TextBoxBase"
  },
  PasswordBox: {
    attrs: {
      CaretBrush: "Brush",
      MaxLength: null,
      PasswordChar: null,
      Password: null,
      SelectionBrush: "Brush",
      SelectionOpacity: null
    },
    base: "Control"
  },
  RangeBase: {
    type: "abstract",
    attrs: {
      LargeChange: null,
      Maximum: null,
      Minimum: null,
      SmallChange: null,
      Value: null
    },
    base: "Control"
  },
  Slider: {
    attrs: {
      Delay: null,
      Interval: null,
      IsDirectionReversed: ["True", "False"],
      IsMoveToPointEnabled: ["True", "False"],
      IsSelectionRangeEnabled: ["True", "False"],
      IsSnapToTickEnabled: ["True", "False"],
      Orientation: ["Horizontal", "Vertical"],
      SelectionEnd: null,
      SelectionStart: null,
      TickFrequency: null,
      Placement: ["None", "TopLeft", "BottomRight", "Both"],
      Ticks: null
    },
    base: "RangeBase"
  },
  ScrollBar: {
    attrs: {
      Orientation: ["Horizontal", "Vertical"],
      ViewportSize: null
    },
    base: "RangeBase"
  },
  Track: {
    attrs: {
      DecreaseButton: "RepeatButton",
      IncreaseButton: "RepeatButton",
      IsDirectionReversed: ["True", "False"],
      Maximum: null,
      Minimum: null,
      Orientation: ["Horizontal", "Vertical"],
      Thumb: "Thumb",
      Value: null,
      ViewportSize: null
    },
    base: "FrameworkElement"
  },
  Thumb: {
    attrs: {},
    base: "Control"
  },
  TickBar: {
    attrs: {
      Fill: "Brush",
      IsDirectionReversed: ["True", "False"],
      IsSelectionRangeEnabled: ["True", "False"],
      Maximum: null,
      Minimum: null,
      Placement: ["Left", "Top", "Right", "Bottom"],
      ReservedSpace: null,
      SelectionEnd: null,
      SelectionStart: null,
      TickFrequency: null,
      Ticks: null
    },
    base: "FrameworkElement"
  },
  Separator: {
    attrs: {},
    base: "Control"
  },
  ScrollViewer: {
    attrs: {
      CanContentScroll: ["True", "False"],
      HorizontalScrollBarVisibility: ["Disabled", "Auto", "Hidden", "Visible"],
      VerticalScrollBarVisibility: ["Disabled", "Auto", "Hidden", "Visible"],
      IsDeferredScrollingEnabled: ["True", "False"],
      PanningMode: ["Both", "HorizontalFirst", "HorizontalOnly", "None", "VerticalFirst", "VerticalOnly"],
      PanningDeceleration: null,
      PanningRatio: null
    },
    base: "ContentControl"
  },
  GroupBox: {
    attrs: {},
    base: "HeaderedContentControl"
  },
  Expander: {
    attrs: {
      ExpandDirection: ["Down", "Up", "Left", "Right"],
      IsExpanded: ["True", "False"]
    },
    base: "HeaderedContentControl"
  },
  MenuBase: {
    type: "abstract",
    attrs: {},
    base: "ItemsControl"
  },
  Menu: {
    attrs: {
      IsMainMenu: ["True", "False"],
      Activated: ["True", "False"]
    },
    base: "MenuBase"
  },
  ContextMenu: {
    attrs: {
      HasDropShadow: ["True", "False"],
      HorizontalOffset: null,
      IsOpen: ["True", "False"],
      Placement: ["Absolute", "Relative", "Bottom", "Center", "Right", "AbsolutePoint", "RelativePoint", "Mouse", "MousePoint", "Left", "Top", "Custom"],
      PlacementRectangle: null,
      PlacementTarget: "UIElement",
      StaysOpen: ["True", "False"],
      VerticalOffset: null
    },
    base: "MenuBase"
  },
  MenuItem: {
    attrs: {
      Command: null,
      CommandParameter: null,
      CommandTarget: "UIElement",
      Icon: "UIElement",
      InputGestureText: null,
      IsCheckable: ["True", "False"],
      IsChecked: ["True", "False"],
      IsSubmenuOpen: ["True", "False"],
      StaysOpenOnClick: ["True", "False"]
    },
    base: "HeaderedItemsControl"
  },
  Selector: {
    attrs: {
      IsSynchronizedWithCurrentItem: ["True", "False"],
      SelectedIndex: null,
      SelectedItem: null,
      SelectedValue: null,
      SelectedValuePath: null
    },
    base: "ItemsControl"
  },
  ListBox: {
    attrs: {
      SelectionMode: ["Single", "Multiple", "Extended"]
    },
    base: "Selector"
  },
  ListBoxItem: {
    attrs: {
      IsSelected: ["True", "False"]
    },
    base: "ContentControl"
  },
  ComboBox: {
    attrs: {
      IsDropDown: ["True", "False"],
      IsEditable: ["True", "False"],
      IsReadOnly: ["True", "False"],
      MaxDropDownHeight: null,
      StaysOpenOnEdit: ["True", "False"],
      Text: null
    },
    base: "Selector"
  },
  ComboBoxItem: {
    attrs: {},
    base: "ListBoxItem"
  },
  ListView: {
    attrs: {
      View: "ViewBase"
    },
    base: "ListBox"
  },
  ListViewItem: {
    attrs: {},
    base: "ListBoxItem"
  },
  ViewBase: {
    type: "abstract",
    attrs: {}
  },
  GridView: {
    attrs: {
      AllowsColumnReorder: ["True", "False"],
      ColumnHeaderContainerStyle: "Style",
      ColumnHeaderContextMenu: "ContextMenu",
      ColumnHeaderStringFormat: null,
      ColumnHeaderTemplate: "DataTemplate",
      ColumnHeaderTemplateSelector: null,
      ColumnHeaderToolTip: "UIElement"
    },
    base: "ViewBase",
    children: ["GridViewColumn"]
  },
  GridViewColumn: {
    attrs: {
      CellTemplate: "DataTemplate",
      CellTemplateSelector: null,
      DisplayMemberBinding: "BindingBase",
      Header: "UIElement",
      HeaderContainerStyle: "Style",
      HeaderStringFormat: null,
      HeaderTemplate: "DataTemplate",
      HeaderTemplateSelector: null,
      Width: null
    }
  },
  GridViewColumnHeader: {
    attrs: {},
    base: "ButtonBase"
  },
  GridViewRowPresenterBase: {
    type: "abstract",
    attrs: {
      Columns: "GridViewColumn"
    },
    base: "FrameworkElement"
  },
  GridViewRowPresenter: {
    attrs: {
      Content: "UIElement"
    },
    base: "GridViewRowPresenterBase"
  },
  GridViewHeaderRowPresenter: {
    attrs: {
      AllowsColumnReorder: ["True", "False"],
      ColumnHeaderContainerStyle: "Style",
      ColumnHeaderContextMenu: "ContextMenu",
      ColumnHeaderStringFormat: null,
      ColumnHeaderTemplate: "DataTemplate",
      ColumnHeaderTemplateSelector: null,
      ColumnHeaderToolTip: "UIElement"
    },
    base: "GridViewRowPresenterBase"
  },
  ToolBar: {
    attrs: {
      BandIndex: null,
      Band: null,
      IsOverflowOpen: ["True", "False"],
    },
    base: "HeaderedItemsControl"
  },
  ToolBarTray: {
    attrs: {
      Background: "Brush",
      Orientation: ["Horizontal", "Vertical"]
    },
    base: "FrameworkElement"
  },
  StatusBar: {
    attrs: {},
    base: "ItemsControl"
  },
  StatusBarItem: {
    attrs: {},
    base: "ContentControl"
  },
  TabControl: {
    attrs: {
      ContentTemplate: "DataTemplate",
      ContentTemplateSelector: null,
      TabStripPlacement: ["Left", "Top", "Right", "Bottom"]
    },
    base: "Selector"
  },
  TabItem: {
    attrs: {
      IsSelected: ["True", "False"]
    },
    base: "HeaderedContentControl"
  },
  TreeView: {
    base: "ItemsControl"
  },
  TreeViewItem: {
    attrs: {
      IsExpanded: ["True", "False"],
      IsSelected: ["True", "False"]
    },
    base: "HeaderedItemsControl"
  },
  Shape: {
    type: "abstract",
    attrs: {
      Fill: "Brush",
      Stretch: ["None", "Fill", "Uniform", "UniformToFill"],
      Stroke: "Brush",
      StrokeDashArray: null,
      StrokeDashCap: ["Flat", "Square", "Round", "Triangle"],
      StrokeDashOffset: null,
      StrokeEndLineCap: ["Flat", "Square", "Round", "Triangle"],
      StrokeLineJoin: ["Miter", "Bevel", "Round"],
      StrokeMiterLimit: null,
      StrokeStartLineCap: ["Flat", "Square", "Round", "Triangle"],
      StrokeThickness: null
    },
    base: "FrameworkElement"
  },
  Rectangle: {
    attrs: {},
    base: "Shape"
  },
  Ellipse: {
    attrs: {},
    base: "Shape"
  },
  Line: {
    attrs: {
      X1: null,
      X2: null,
      Y1: null,
      Y2: null
    },
    base: "Shape"
  },
  Path: {
    attrs: {
      Data: "Geometry"
    },
    base: "Shape"
  },
  Brush: {
    type: "abstract",
    attrs: {
      Opacity: null,
      RelativeTransform: "Transform",
      Transform: "Transform"
    }
  },
  SolidColorBrush: {
    attrs: {
      Color: null
    },
    base: "Brush"
  },
  GradientBrush: {
    type: "abstract",
    attrs: {
      ColorInterpolationMode: ["ScRgbLinearInterpolation", "SRgbLinearInterpolation"],
      GradientStops: null,
      MappingMode: ["Absolute", "RelativeToBoundingBox"],
      SpreadMethod: ["Pad", "Reflect", "Repeat"]
    },
    base: "Brush",
    children: ["GradientStop"]
  },
  GradientStop: {
    attrs: {
      Offset: null,
      Color: null
    }
  },
  LinearGradientBrush: {
    attrs: {
      StartPoint: null,
      EndPoint: null
    },
    base: "GradientBrush"
  },
  RadialGradientBrush: {
    attrs: {
      Center: null,
      GradientOrigin: null,
      RadiusX: null,
      RadiusY: null
    },
    base: "GradientBrush"
  },
  TileBrush: {
    type: "abstract",
    attrs: {
      AlignmentX: ["Left", "Right", "Center"],
      AlignmentY: ["Top", "Bottom", "Center"],
      Stretch: ["None", "Fill", "Uniform", "UniformToFill"],
      TileMode: ["None", "Tile", "FlipX", "FlipY", "FlipXY"],
      Viewbox: null,
      ViewboxUnits: ["Absolute", "RelativeToBoundingBox"],
      Viewport: null,
      ViewportUnits: ["Absolute", "RelativeToBoundingBox"]
    },
    base: "Brush"
  },
  ImageBrush: {
    attrs: {
      ImageSource: null
    },
    base: "TileBrush"
  },
  VisualBrush: {
    attrs: {
      Visual: "FrameworkElement"
    },
    base: "TileBrush"
  },
  ImageSource: {
    type: "abstract",
    attrs: {}
  },
  BitmapSource: {
    attrs: {},
    base: "ImageSource"
  },
  BitmapImage: {
    attrs: {
      UriSource: null
    },
    base: "BitmapSource"
  },
  Transform: {
    type: "abstract",
    attrs: {}
  },
  TransformGroup: {
    attrs: {
      Children: "Transform"
    },
    base: "Transform",
    children: ["Transform"]
  },
  TranslateTransform: {
    attrs: {
      X: null,
      Y: null
    },
    base: "Transform",
  },
  ScaleTransform: {
    attrs: {
      ScaleX: null,
      ScaleY: null
    },
    base: "Transform"
  },
  SkewTransform: {
    attrs: {
      AngleX: null,
      AngleY: null,
      CenterX: null,
      CenterY: null
    },
    base: "Transform"
  },
  RotateTransform: {
    attrs: {
      Angle: null,
      CenterX: null,
      CenterY: null
    },
    base: "Transform"
  },
  CompositeTransform: {
    attrs: {
      CenterX: null,
      CenterY: null,
      Rotation: null,
      ScaleX: null,
      ScaleY: null,
      SkewX: null,
      SkewY: null,
      TranslateX: null,
      TranslateY: null
    },
    base: "Transform"
  },
  MatrixTransform: {
    attrs: {
      Matrix: null
    },
    base: "Transform"
  },
  'noesis:Transform3D': {
    type: "abstract",
    attrs: {}
  },
  'noesis:CompositeTransform3D': {
    attrs: {
      CenterX: null,
      CenterY: null,
      CenterZ: null,
      RotationX: null,
      RotationY: null,
      RotationZ: null,
      ScaleX: null,
      ScaleY: null,
      ScaleZ: null,
      TranslateX: null,
      TranslateY: null,
      TranslateZ: null
    },
    base: "noesis:Transform3D"
  },
  'noesis:MatrixTransform3D': {
    attrs: {
      Matrix: null
    },
    base: "noesis:Transform3D"
  },
  Geometry: {
    attrs: {
      Transform: "Transform"
    }
  },
  GeometryGroup: {
    attrs: {
      Children: "Transform",
      FillRule: ["EvenOdd", "Nonzero"]
    },
    base: "Geometry",
    children: ["Geometry"]
  },
  CombinedGeometry: {
    attrs: {
      Geometry1: "Geometry",
      Geometry2: "Geometry",
      GeometryCombineMode: ["Union", "Intersect", "Xor", "Exclude"]
    },
    base: "Geometry"
  },
  RectangleGeometry: {
    attrs: {
      RadiusX: null,
      RadiusY: null,
      Rect: null
    },
    base: "Geometry"
  },
  EllipseGeometry: {
    attrs: {
      Center: null,
      RadiusX: null,
      RadiusY: null
    },
    base: "Geometry"
  },
  LineGeometry: {
    attrs: {
      StartPoint: null,
      EndPoint: null
    },
    base: "Geometry"
  },
  StreamGeometry: {
    attrs: {
      FillRule: ["EvenOdd", "Nonzero"]
    },
    base: "Geometry"
  },
  PathGeometry: {
    attrs: {
      FillRule: ["EvenOdd", "Nonzero"],
      Figures: "PathFigure"
    },
    base: "Geometry",
    children: ["PathFigure"]
  },
  PathFigure: {
    attrs: {
      IsClosed: ["True", "False"],
      IsFilled: ["True", "False"],
      Segments: "PathSegment"
    },
    children: ["PathSegment"]
  },
  PathSegment: {
    type: "abstract",
    attrs: {
      IsSmoothJoin: ["True", "False"],
      IsStroked: ["True", "False"]
    }
  },
  ArcSegment: {
    attrs: {
      Point: null,
      Size: null,
      RotationAngle: null,
      IsLargeArc: ["True", "False"],
      SweepDirection: ["Counterclockwise", "Clockwise"]
    },
    base: "PathSegment"
  },
  LineSegment: {
    attrs: {
      Point: null
    },
    base: "PathSegment"
  },
  QuadraticBezierSegment: {
    attrs: {
      Point1: null,
      Point2: null
    },
    base: "PathSegment"
  },
  BezierSegment: {
    attrs: {
      Point1: null,
      Point2: null,
      Point3: null
    },
    base: "PathSegment"
  },
  PolyLineSegment: {
    attrs: {
      Points: null
    },
    base: "PathSegment"
  },
  PolyQuadraticBezierSegment: {
    attrs: {
      Points: null
    },
    base: "PathSegment"
  },
  PolyBezierSegment: {
    attrs: {
      Points: null
    },
    base: "PathSegment"
  },
  FrameworkTemplate: {
    type: "abstract",
    attrs: {
      Resources: "ResourceDictionary",
      VisualTree: "FrameworkElement",
      Triggers: "TriggerBase"
    },
    children: ["FrameworkElement"]
  },
  ControlTemplate: {
    attrs: {
      TargetType: null
    },
    base: "FrameworkTemplate"
  },
  DataTemplate: {
    attrs: {
      DataType: null
    },
    base: "FrameworkTemplate"
  },
  ItemsPanelTemplate: {
    attrs: {},
    base: "FrameworkTemplate"
  },
  Style: {
    attrs: {
      Resources: "ResourceDictionary",
      Setters: "Setter",
      Triggers: "TriggerBase"
    },
    children: ["Setter"]
  },
  TriggerBase: {
    type: "abstract",
    attrs: {
      EnterActions: "TriggerAction",
      ExitActions: "TriggerAction"
    }
  },
  Trigger: {
    attrs: {
      Property: null,
      Value: null,
      SourceName: null,
      Setters: "Setter"
    },
    base: "TriggerBase",
    children: ["Setter"]
  },
  MultiTrigger: {
    attrs: {
      Conditions: "Condition",
      Setters: "Setter"
    },
    base: "TriggerBase",
    children: ["Setter"]
  },
  DataTrigger: {
    attrs: {
      Binding: "BindingBase",
      Value: null,
      Setters: "Setter"
    },
    base: "TriggerBase",
    children: ["Setter"]
  },
  MultiDataTrigger: {
    attrs: {
      Conditions: "Condition",
      Setters: "Setter"
    },
    base: "TriggerBase",
    children: ["Setter"]
  },
  EventTrigger: {
    attrs: {
      Actions: "TriggerAction"
    },
    base: "TriggerBase"
  },
  TriggerAction: {
    type: "abstract",
    attrs: {}
  },
  BeginStoryboard: {
    attrs: {
      HandoffBehavior: ["SnapshotAndReplace", "Compose"],
      Name: null,
      Storyboard: "Storyboard"
    },
    base: "TriggerAction"
  },
  ControllableStoryboardAction: {
    type: "abstract",
    attrs: {
      BeginStoryboardName: null
    },
    base: "TriggerAction"
  },
  PauseStoryboard: {
    attrs: {},
    base: "ControllableStoryboardAction"
  },
  ResumeStoryboard: {
    attrs: {},
    base: "ControllableStoryboardAction"
  },
  StopStoryboard: {
    attrs: {},
    base: "ControllableStoryboardAction"
  },
  Setter: {
    attrs: {
      Property: null,
      Value: null,
      TargetName: null
    }
  },
  Condition: {
    attrs: {
      Binding: "BindingBase",
      Property: null,
      Value: null
    }
  },
  InputBinding: {
    type: "abstract",
    attrs: {
      Command: null,
      CommandParameter: null,
      CommandTarget: "UIElement",
      Gesture: "InputGesture"
    }
  },
  KeyBinding: {
    attrs: {
      Key: null,
      Modifiers: ["None", "Alt", "Control", "Shift", "Windows"]
    },
    base: "InputBinding"
  },
  InputGesture: {
    type: "abstract",
    attrs: {}
  },
  KeyGesture: {
    attrs: {},
    base: "InputGesture"
  },
  BindingBase: {
    type: "abstract",
    attrs: {
      Delay: null,
      FallbackValue: null,
      TargetNullValue: null,
      StringFormat: null
    }
  },
  Binding: {
    type: "markup",
    attrs: {
      Path: null,
      ElementName: null,
      Source: null,
      RelativeSource: "RelativeSource",
      Converter: null,
      ConverterParameter: null,
      Mode: ["OneTime", "OneWay", "OneWayToSource", "TwoWay"],
      UpdateSourceTrigger: ["PropertyChanged", "LostFocus", "Explicit"]
    },
    base: "BindingBase"
  },
  MultiBinding: {
    type: "markup",
    attrs: {
      Bindings: "Binding",
      Converter: null,
      ConverterParameter: null,
      Mode: ["OneTime", "OneWay", "OneWayToSource", "TwoWay"],
      UpdateSourceTrigger: ["PropertyChanged", "LostFocus", "Explicit"]
    },
    base: "BindingBase",
    children: ["Binding"]
  },
  TemplateBinding: {
    type: "markup",
    attrs: {
      Property: null
    }
  },
  CommandBinding: {
    attrs: {
      Command: null
    }
  },
  StaticResource: {
    type: "markup",
    attrs: {
      ResourceKey: null
    }
  },
  DynamicResource: {
    type: "markup",
    attrs: {
      ResourceKey: null
    }
  },
  'x:Type': {
    type: "markup",
    attrs: {
      Type: null,
      TypeName: null
    }
  },
  'x:Static': {
    type: "markup",
    attrs: {
      Member: null
    }
  },
  'x:Null': {
    type: "markup",
    attrs: {}
  },
  'i:Behavior': {
    type: "abstract",
    attrs: {}
  },
  'ei:ConditionBehavior': {
    attrs: {
      Condition: "ei:ConditionalExpression"
    },
    base: "i:Behavior",
    children: ["ei:ConditionalExpression"]
  },
  'ei:ConditionalExpression': {
    attrs: {
      ForwardChaining: ["And", "Or"],
      Conditions: "ei:ComparisonCondition"
    },
    children: ["ei:ComparisonCondition"]
  },
  'ei:ComparisonCondition': {
    attrs: {
      LeftOperand: null,
      Operator: ["Equal", "NotEqual", "LessThan", "LessThanOrEqual", "GreaterThan", "GreaterThanOrEqual"],
      RightOperand: null
    }
  },
  'ei:MouseDragElementBehavior': {
    attrs: {
      ConstrainToParentBounds: ["True", "False"],
      X: null,
      Y: null
    },
    base: "i:Behavior"
  },
  'ei:TranslateZoomRotateBehavior': {
    attrs: {
      ConstrainToParentBounds: ["True", "False"],
      SupportedGestures: ["None", "TranslateX", "TranslateY", "Translate", "Rotate", "Scale", "All"],
      MinimumScale: null,
      MaximumScale: null,
      RotationalFriction: null,
      TranslateFriction: null,
      WheelSensitivity: null
    },
    base: "i:Behavior"
  },
  'noesis:CollectionSortBehavior': {
    attrs: {
      Comparer: null,
      ItemsSource: null
    },
    base: "i:Behavior"
  },
  'noesis:CollectionFilterBehavior': {
    attrs: {
      Predicate: null,
      ItemsSource: null
    },
    base: "i:Behavior"
  },
  'i:TriggerBase': {
    type: "abstract",
    attrs: {
      Actions: "i:TriggerAction"
    }
  },
  'i:EventTriggerBase': {
    type: "abstract",
    attrs: {
      SourceObject: null,
      SourceName: null
    },
    base: "i:TriggerBase"
  },
  'i:EventTrigger': {
    attrs: {
      EventName: null
    },
    base: "i:EventTriggerBase"
  },
  'ei:TimerTrigger': {
    attrs: {
      MillisecondsPerTick: null,
      TotalTicks: null
    },
    base: "i:EventTrigger"
  },
  'ei:KeyTrigger': {
    attrs: {
      ActiveOnFocus: ["True", "False"],
      FiredOn: ["KeyDown", "KeyUp"],
      Key: null,
      Modifiers: ["None", "Alt", "Control", "Shift", "Windows"]
    },
    base: "i:TriggerBase"
  },
  'noesis:GamepadTrigger': {
    attrs: {
      ActiveOnFocus: ["True", "False"],
      FiredOn: ["KeyDown", "KeyUp"],
      Button: ["Left", "Up", "Right", "Down", "Accept", "Cancel", "Menu", "View", "PageUp", "PageDown", "PageLeft", "PageRight", "Context1", "Context2", "Context3", "Context4" ]
    },
    base: "i:TriggerBase"
  },
  'ei:PropertyChangedTrigger': {
    attrs: {
      Binding: null
    },
    base: "i:TriggerBase"
  },
  'ei:DataTrigger': {
    attrs: {
      Value: null,
      Comparison: ["Equal", "NotEqual", "LessThan", "LessThanOrEqual", "GreaterThan", "GreaterThanOrEqual"],
    },
    base: "ei:PropertyChangedTrigger"
  },
  'ei:StoryboardTrigger': {
    type: "abstract",
    attrs: {
      Storyboard: "Storyboard"
    },
    base: "i:TriggerBase"
  },
  'ei:StoryboardCompletedTrigger': {
    attrs: {},
    base: "ei:StoryboardTrigger"
  },
  'i:TriggerAction': {
    type: "abstract",
    attrs: {
      IsEnabled: ["True", "False"]
    }
  },
  'i:TargetedTriggerAction': {
    type: "abstract",
    attrs: {
      TargetObject: null,
      TargetName: null
    },
    base: "i:TriggerAction"
  },
  'i:InvokeCommandAction': {
    attrs: {
      CommandName: null,
      Command: null,
      CommandParameter: null
    },
    base: "i:TargetedTriggerAction"
  },
  'ei:ChangePropertyAction': {
    attrs: {
      PropertyName: null,
      Value: null,
      Duration: null,
      Increment: ["True", "False"]
    },
    base: "i:TargetedTriggerAction"
  },
  'ei:GoToStateAction': {
    attrs: {
      StateName: null,
      UseTransitions: ["True", "False"]
    },
    base: "i:TargetedTriggerAction"
  },
  'ei:RemoveElementAction': {
    attrs: {},
    base: "i:TargetedTriggerAction"
  },
  'ei:StoryboardAction': {
    attrs: {
      Storyboard: "Storyboard"
    },
    base: "i:TriggerAction"
  },
  'ei:ControlStoryboardAction': {
    attrs: {
      ControlStoryboardOption: ["Play", "Stop", "TogglePlayPause", "Pause", "Resume", "SkipToFill"]
    },
    base: "ei:StoryboardAction"
  },
  'ei:LaunchUriOrFileAction': {
    attrs: {
      Path: null
    },
    base: "i:TriggerAction"
  },
  'ei:PlaySoundAction': {
    attrs: {
      Source: null,
      Volume: null
    },
    base: "i:TriggerAction"
  },
  'noesis:SetFocusAction': {
    attrs: {},
    base: "i:TargetedTriggerAction"
  },
  'noesis:SelectAction': {
    attrs: {},
    base: "i:TriggerAction"
  },
  'noesis:SelectAllAction': {
    attrs: {},
    base: "i:TriggerAction"
  },
  'noesis:StyleBehaviorCollection': {
    attrs: {},
    children: ["i:Behavior"]
  },
  'noesis:StyleTriggerCollection': {
    attrs: {},
    children: ["i:TriggerBase"]
  }
};

export default Schema