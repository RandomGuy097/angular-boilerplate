import 'reflect-metadata'; // TODO this is needed for my decorators to work

import { RestErrorResponseWrapper } from 'ng2-rest/src';
import { Helpers, Utils, UtilsOs } from 'tnp-core/src';

import * as base from './base-classes/base';
import * as createContextFn from './create-context';
import * as controllerDecorator from './decorators/classes/controller-decorator';
import * as entityDecorator from './decorators/classes/entity-decorator';
import * as middlewareDecorator from './decorators/classes/middleware-decorator';
import * as migrationDecorator from './decorators/classes/migration-decorator';
import * as providerDecorator from './decorators/classes/provider-decorator';
import * as repositoryDecorator from './decorators/classes/repository-decorator';
import * as subscriberDecorator from './decorators/classes/subscriber-decorator';
import * as http from './decorators/http/http-decorators';
import * as endpointContext from './endpoint-context';
import * as getResponse from './get-response-value';
import * as injectFn from './inject';
import * as models from './models';
import * as orm from './orm';
// import * as allSymbols from './symbols';

// export * from './build-info._auto-generated_';
export * from './constants';
export * from './context-db-migrations';
export * from './create-context';
export * from './endpoint-context-storage';
export * from './endpoint-context';
export * from './entity-process';
export * from './get-response-value';
// export * from './index';
export * from './inject';
export * from './models';
export * from './symbols';
export * from './validators';
export * from './base-classes/base-abstract-entity';
export * from './base-classes/base-angular-service';
export * from './base-classes/base-class';
export * from './base-classes/base-context';
export * from './base-classes/base-controller';
export * from './base-classes/base-crud-controller';
export * from './base-classes/base-custom-repository';
export * from './base-classes/base-entity';
export * from './base-classes/base-file-upload.middleware';
export * from './base-classes/base-injector';
export * from './base-classes/base-middleware';
export * from './base-classes/base-migration';
export * from './base-classes/base-provider';
export * from './base-classes/base-repository';
export * from './base-classes/base-subscriber-for-entity';
export * from './config/controller-config';
export * from './config/controller-options';
export * from './config/method-config';
export * from './config/param-config';
export * from './decorators/decorator-abstract-opt';
export * from './dependency-injection/di-container';
export * from './formly/formly-group-wrapper.component'; // @browser
export * from './formly/formly-repeat.component'; // @browser
export * from './formly/formly.models'; // @browser
export * from './formly/fromly'; // @browser
export * from './formly/type-from-entity'; // @browser
export * from './helpers/class-helpers';
export * from './helpers/clone-obj';
export * from './helpers/leo-helpers';
export * from './orm/columns';
export * from './realtime/realtime-client';
export * from './realtime/realtime-core';
export * from './realtime/realtime-server';
export * from './realtime/realtime-subs-manager';
export * from './realtime/realtime.models';
export * from './decorators/classes/controller-decorator';
export * from './decorators/classes/entity-decorator';
export * from './decorators/classes/middleware-decorator';
export * from './decorators/classes/migration-decorator';
export * from './decorators/classes/provider-decorator';
export * from './decorators/classes/repository-decorator';
export * from './decorators/classes/subscriber-decorator';
export * from './decorators/http/http-methods-decorators';
export * from './decorators/http/http-params-decorators';
export * from './realtime/realtime-strategy/realtime-strategy-ipc';
export * from './realtime/realtime-strategy/realtime-strategy-mock';
export * from './realtime/realtime-strategy/realtime-strategy-socket-io';
export * from './realtime/realtime-strategy/realtime-strategy';
export * from './ui/leo-admin-mode-configuration/leo-admin.service'; // @browser
export * from './formly/formly-group-wrapper.component'; // @browser
export * from './formly/formly-repeat.component'; // @browser

export type {
  TaonClientMiddlewareInterceptOptions,
  TaonServerMiddlewareInterceptOptions,
} from 'ng2-rest/src';

// TODO export all things

export namespace Leo {
  /**
   * Remove global loader from env.ts [loading.preAngularBootstrap]
   */
  export const removeLoader = (afterMS: number = 0): Promise<void> => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        (globalThis?.window as Window)?.document
          ?.getElementById('leopreloadertoremove')
          ?.remove();

        const body = (globalThis?.window as Window)?.document?.body;
        if (body && body.style) {
          body.style.backgroundColor = '';
        }
        resolve();
      }, afterMS);
    });
  };

  export const error = (
    opt:
      | Pick<
          RestErrorResponseWrapper,
          'message' | 'status' | 'details' | 'code'
        >
      | string,
  ): void => {
    throw () => {
      if (typeof opt === 'string') {
        opt = {
          message: opt,
        };
      }
      return opt;
    };
  };

  export type ResponseHtml = models.Models.Http.Response<string>;
  export type Response<T = string> = models.Models.Http.Response<T>;
  // TODO new 5.8 typescript is not allowing this
  // export import Http = http.Http;
  // export import Base = base.Base;
  // export import Orm = orm.Orm;

  export type StartParams = models.Models.StartParams;
  export const getResponseValue = getResponse.getResponseValue;

  //#region class decorators
  // TODO new 5.8 typescript is not allowing this
  // export import Controller = controllerDecorator.TaonController;
  // export import Entity = entityDecorator.TaonEntity;
  // export import Provider = providerDecorator.TaonProvider;
  // export import Repository = repositoryDecorator.TaonRepository;
  // export import Subscriber = subscriberDecorator.TaonSubscriber;
  // export import Migration = migrationDecorator.TaonMigration;
  // export import Middleware = middlewareDecorator.TaonMiddleware;
  //#endregion

  //#region aliases to helpers
  export const isBrowser = UtilsOs.isBrowser;
  export const isNode = UtilsOs.isNode;
  export const isWebSQL = UtilsOs.isWebSQL;
  export const isElectron = UtilsOs.isElectron;
  //#endregion
  export const createContext = createContextFn.createContext;
  export const createContextTemplate = createContextFn.createContextTemplate;

  export const inject = injectFn.inject;

  /**
   * @deprecated
   * use createContext instead
   */
  export const init = async (options: {
    host: string;
    entities: Function[];
    controllers: Function[];
  }) => {
    const TaonBaseContext = (await import('./base-classes/base-context'))
      .TaonBaseContext;
    const context = createContext(() => ({
      appId: 'default-app-not-used-anymore',
      contextName: 'default',
      host: options.host,
      contexts: { TaonBaseContext },
      database: true,
      entities: Array.from(options.entities) as any,
      controllers: Array.from(options.controllers) as any,
    }));

    await context.initialize();
    return context;
  };
}

//#region leo flattening map
export const LEO_FLATTEN_MAPPING = {
  'leo/src': {
    // =====================
    // Leo.Http.*
    // =====================
    'Leo.Http.GET': 'GET',
    'Leo.Http.POST': 'POST',
    'Leo.Http.PUT': 'PUT',
    'Leo.Http.DELETE': 'DELETE',
    'Leo.Http.PATCH': 'PATCH',
    'Leo.Http.HEAD': 'HEAD',
    'Leo.Http.HTML': 'HTML',
    'Leo.Http.Response': 'HttpResponse',

    'Leo.Http.Param.Query': 'Query',
    'Leo.Http.Param.Path': 'Path',
    'Leo.Http.Param.Body': 'Body',
    'Leo.Http.Param.Cookie': 'Cookie',
    'Leo.Http.Param.Header': 'Header',

    // =====================
    // Leo.Base.*
    // =====================
    'Leo.Base.Controller': 'TaonBaseController',
    'Leo.Base.CrudController': 'TaonBaseCrudController',
    'Leo.Base.Entity': 'TaonBaseEntity',
    'Leo.Base.AbstractEntity': 'TaonBaseAbstractEntity',
    'Leo.Base.AbstractEntityOmitKeys': 'AbstractEntityOmitKeys',
    'Leo.Base.Provider': 'TaonBaseProvider',
    'Leo.Base.Class': 'TaonBaseClass',
    'Leo.Base.Repository': 'TaonBaseRepository',
    'Leo.Base.CustomRepository': 'TaonBaseCustomRepository',
    'Leo.Base.SubscriberForEntity': 'TaonBaseSubscriberForEntity',
    'Leo.Base.Migration': 'TaonBaseMigration',
    'Leo.Base.Middleware': 'TaonBaseMiddleware',
    'Leo.Base.AngularService': 'TaonBaseAngularService',
    'Leo.Base.Context': 'TaonBaseContext',

    // =====================
    // Leo.Controller.* (decorators)
    // =====================
    'Leo.Controller': 'TaonController',
    'Leo.Entity': 'TaonEntity',
    'Leo.Provider': 'TaonProvider',
    'Leo.Repository': 'TaonRepository',
    'Leo.Subscriber': 'TaonSubscriber',
    'Leo.Migration': 'TaonMigration',
    'Leo.Middleware': 'TaonMiddleware',

    // =====================
    // Leo.Orm.*
    // =====================
    'Leo.Orm.Repository': 'Repository',
    'Leo.Orm.Connection': 'Connection',

    // ListenEvent
    'Leo.Orm.ListenEvent.AfterInsert': 'AfterInsert',
    'Leo.Orm.ListenEvent.AfterLoad': 'AfterLoad',
    'Leo.Orm.ListenEvent.AfterRecover': 'AfterRecover',
    'Leo.Orm.ListenEvent.AfterRemove': 'AfterRemove',
    'Leo.Orm.ListenEvent.AfterSoftRemove': 'AfterSoftRemove',
    'Leo.Orm.ListenEvent.AfterUpdate': 'AfterUpdate',
    'Leo.Orm.ListenEvent.BeforeInsert': 'BeforeInsert',
    'Leo.Orm.ListenEvent.BeforeRecover': 'BeforeRecover',
    'Leo.Orm.ListenEvent.BeforeRemove': 'BeforeRemove',
    'Leo.Orm.ListenEvent.BeforeSoftRemove': 'BeforeSoftRemove',
    'Leo.Orm.ListenEvent.BeforeUpdate': 'BeforeUpdate',

    // Tree
    'Leo.Orm.Tree.Children': 'TreeChildren',
    'Leo.Orm.Tree.Parent': 'TreeParent',

    // Column
    'Leo.Orm.Column.Generated': 'Generated',
    'Leo.Orm.Column.Primary': 'PrimaryColumn',
    'Leo.Orm.Column.Index': 'Index',
    'Leo.Orm.Column.CreateDate': 'CreateDateColumn',
    'Leo.Orm.Column.UpdateDate': 'UpdateDateColumn',
    'Leo.Orm.Column.DeleteDate': 'DeleteDateColumn',
    'Leo.Orm.Column.Custom': 'Column',

    'Leo.Orm.Column.String': 'StringColumn',
    'Leo.Orm.Column.String100': 'String100Column',
    'Leo.Orm.Column.String45': 'String45Column',
    'Leo.Orm.Column.String500': 'String500Column',
    'Leo.Orm.Column.String200': 'String200Column',
    'Leo.Orm.Column.Number': 'NumberColumn',
    'Leo.Orm.Column.DecimalNumber': 'DecimalNumberColumn',
    'Leo.Orm.Column.SimpleJson': 'SimpleJsonColumn',
    'Leo.Orm.Column.Boolean': 'BooleanColumn',
    'Leo.Orm.Column.DateTIme': 'DateTimeColumn',

    'Leo.Orm.Column.Version': 'VersionColumn',
    'Leo.Orm.Column.Virtual': 'VirtualColumn',

    // Join
    'Leo.Orm.Join.Table': 'JoinTable',
    'Leo.Orm.Join.Column': 'JoinColumn',

    // Relation
    'Leo.Orm.Relation.OneToMany': 'OneToMany',
    'Leo.Orm.Relation.OneToOne': 'OneToOne',
    'Leo.Orm.Relation.ManyToMany': 'ManyToMany',
    'Leo.Orm.Relation.ManyToOne': 'ManyToOne',
  },
  'taon-storage/src': {
    // =====================
    // Stor.* (new clean API)
    // =====================
    'Stor.Property.In.LocalStorage': 'StorPropertyInLocalStorage',
    'Stor.Property.In.IndexedDb': 'StorPropertyInIndexedDb',

    // short alias style (if you prefer this pattern in some codebases)
    'Stor.In.LocalStorage': 'StorPropertyInLocalStorage',
    'Stor.In.IndexedDb': 'StorPropertyInIndexedDb',

    // =====================
    // Stor.property.in.* (back-compat chain you mentioned)
    // =====================
    'Stor.property.in.localstorage': 'StorPropertyInLocalStorage',
    'Stor.property.in.indexedb': 'StorPropertyInIndexedDb',
    'Stor.property.in.indexedDb': 'StorPropertyInIndexedDb',

    // Optional: if your old code had Stor.proper... (typo)
    'Stor.proper.in.localstorage': 'StorPropertyInLocalStorage',
    'Stor.proper.in.indexedb': 'StorPropertyInIndexedDb',
  },
} satisfies Record<string, Record<string, string>>;
//#endregion
