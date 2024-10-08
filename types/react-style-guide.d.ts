import type { ReactElement } from "react";

interface Components {
	AvatarCardItem: AvatarCardItem;
	AvatarCardList: AvatarCardList;
	Banner: Banner;
	Button: Button;
	DatePicker: DatePicker;
	Dropdown: Dropdown;
	FileUpload: FileUpload;
	FilterSelect: FilterSelect;
	Form: Form;
	FormControl: FormControl;
	FormGroup: FormGroup;
	IconButton: IconButton;
	Image: Image;
	ItemCard: ItemCard;
	ItemCardUtils: ItemCardUtils;
	Link: Link;
	Loading: Loading;
	Modal: Modal;
	NativeDropdown: NativeDropdown;
	Pagination: Pagination;
	Popover: Popover;
	ProgressBar: ProgressBar;
	ScrollBar: ScrollBar;
	Section: Section;
	SimpleModal: SimpleModal;
	SimpleTab: SimpleTab;
	SimpleTabs: SimpleTabs;
	SystemFeedback: SystemFeedback;
	SystemFeedbackProvider: SystemFeedbackProvider;
	Tabs: Tabs;
	TextFormField: TextFormField;
	Toast: Toast;
	Toggle: Toggle;
	Tooltip: Tooltip;
	createModal: createModal;
	createSystemFeedback: createSystemFeedback;
	useSystemFeedback: useSystemFeedback;
}

type WithReactElement<T> = {
	[K in keyof T]: T[K] extends ReactElement ? T[K] : T[K];
};

export type ReactStyleGuide = WithReactElement<Components>;
