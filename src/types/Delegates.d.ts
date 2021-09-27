declare type Action = (value: any) => any;

declare type ValueTransformer = {
	in: Action,
	out: Action
}