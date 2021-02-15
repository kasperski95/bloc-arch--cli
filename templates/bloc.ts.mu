import { Bloc } from "@bloc-arch/core";
import * as {{name.pascal}}Events from "./{{filenames.eventFile}}";
import * as {{name.pascal}}States from "./{{filenames.stateFile}}";

export class {{name.pascal}}Bloc extends Bloc<
  {{name.pascal}}Events.{{name.pascal}}Event,
  {{name.pascal}}States.{{name.pascal}}State
> {
  constructor() {
    super(new {{name.pascal}}States.Initial());
  }

  async *mapEventToState(event: {{name.pascal}}Events.{{name.pascal}}Event) {
    // TODO: implement
  }
}
