import { Bloc } from "@bloc-arch/core";
import * as {{name.pascal}}Events from "./{{filenames.eventFile}}";
import * as {{name.pascal}}States from "./{{filenames.stateFile}}";

export class {{name.pascal}}Bloc {
  constructor() {
    super(new {{name.pascal}}States.Initial());
  }

  async *mapEventToState(event) {
    // TODO: implement
  }
}
