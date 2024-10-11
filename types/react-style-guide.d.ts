import type { createSystemFeedback } from "@/types/system-feedback/create-system-feedback";
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

type IsStrictAny<T> = unknown extends T
	? T extends object
		? true
		: false
	: false;
type WithReactElement<T> = {
	[K in keyof T]: IsStrictAny<T[K]> extends true
		? ((...args: any[]) => ReactElement) & {
				[key: string]: any;
			}
		: T[K];
};

export type ReactStyleGuide = WithReactElement<Components>;
