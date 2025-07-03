import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';

import Application from '@theemo-playground/ember/app';
import config from '@theemo-playground/ember/config/environment';

export function start() {
  setApplication(Application.create(config.APP));

  // eslint-disable-next-line import-x/namespace
  setup(QUnit.assert);
  setupEmberOnerrorValidation();

  qunitStart();
}
