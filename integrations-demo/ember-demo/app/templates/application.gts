import { pageTitle } from 'ember-page-title';
import Route from 'ember-route-template';

import Themer from '../components/themer';

export default Route(
  <template>
    {{pageTitle "EmberDemo"}}

    <Themer />
  </template>
);
