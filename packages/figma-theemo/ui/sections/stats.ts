import Section from './section';

export default class StatsSection extends Section {
  name = 'stats';

  setup() {
    this.messenger.addListener('stats-collected', (result) => {
      for (const [prop, value] of Object.entries(result)) {
        document.getElementById(`stats-${prop}`).innerHTML = value as string;
      }
    });
  }

  activate(name) {
    this.messenger.send('collect-stats');
  }
}