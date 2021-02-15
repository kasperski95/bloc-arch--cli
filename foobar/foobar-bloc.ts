import { Bloc } from "@bloc-arch/core";
import * as FoobarEvents from "./foobar-event";
import * as FoobarStates from "./foobar-state";

export class FoobarBloc extends Bloc<
  FoobarEvents.FoobarEvent,
  FoobarStates.FoobarState
> {
  constructor() {
    super(new FoobarStates.Initial());
  }

  async *mapEventToState(event: FoobarEvents.FoobarEvent) {
    // TODO: implement
  }
}
