import { CoreModels } from 'tnp-core/src';

import type { EndpointContext } from './endpoint-context';

export class ContextsEndpointStorage {
  SPECIAL_APP_READY_MESSAGE = CoreModels.SPECIAL_APP_READY_MESSAGE;
  private leoEndpointContexts = new Map<string, EndpointContext>();

  //#region singleton
  private static instance: ContextsEndpointStorage;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static get Instance(): ContextsEndpointStorage {
    if (!ContextsEndpointStorage.instance) {
      ContextsEndpointStorage.instance = new ContextsEndpointStorage();
    }
    return ContextsEndpointStorage.instance;
  }
  //#endregion

  set(context: EndpointContext): void {
    if (!this.leoEndpointContexts.has(context.contextName)) {
      this.leoEndpointContexts.set(context.contextName, context);
    }
  }

  get arr(): EndpointContext[] {
    return Array.from(this.leoEndpointContexts.values()).filter(
      f => f.contextType === 'normal',
    );
  }

  getBy(
    context: Partial<EndpointContext> | string,
  ): EndpointContext | undefined {
    if (typeof context === 'string') {
      return this.leoEndpointContexts.get(context) as any;
    }
    return this.leoEndpointContexts.get(context.contextName) as any;
  }
}

// TODO QUICK_FIX @LAST encapsulate this => move to separate package
globalThis['$$$ContextsEndpointStorage$$$'] = ContextsEndpointStorage.Instance;
