import { BlocState } from "@bloc-arch/core";

export abstract class FoobarState extends BlocState {}

export class Initial extends FoobarState {}