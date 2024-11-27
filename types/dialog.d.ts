interface Dialog {
	blue: string;
	clickNo: () => void;
	clickYes: () => void;
	close: (id: string) => void;
	disableButtons: () => void;
	enableButtons: () => void;
	green: string;
	none: string;
	open: (props: unknown) => void;
	status: { isOpen: boolean };
	toggleProcessing: (isShown: boolean, closeClass: string) => void;
	white: string;
}
