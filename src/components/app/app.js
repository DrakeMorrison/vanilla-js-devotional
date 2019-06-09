import * as css from './index.css'
import { apiKey } from './apiKey';
import axios from 'axios';

export default class App {
    constructor (elem) {
      if (!elem) {
        return
      }
      this.elem = elem
      this.url = 'https://api.esv.org/v3/passage/html/?q=';
      const baseOptions = '';
      this.options = baseOptions + '';
      this.optionsWithCopyright = baseOptions + '';
    }

    render (scripture) {
        if (this.elem) this.elem.innerHTML = scripture;
    }

    // Bible Devotional Workflow:
    // Morning:
    // 2 Psalms
    // 1 New Testamant
    // 1 Proverb

    // Evening:
    // 1 Old Testament
    // 3 Psalms

    getDevotional() {
      // if am, get morningdevotional
      // else, get  evening devotional

      return this.isAM() ?
      this.getMorningDevotional() :
      this.getEveningDevotional();
    }

    isAM() {
      return new Date().getHours() < 12;
    }

    getMorningDevotional() {
      // get 1 old testament
      // 2 psalms for the morning
      // 1 proverb
      const psalms = this.getPsalms();
      const newTest = this.getNewTestament();
      const proverb = this.getProverb();

      return Promise.all([psalms, newTest, proverb]).then(results => {
        return results[0].toString() + results[1].toString() + results[2].toString();
      }).catch(console.error.bind(console));
    }

    getNewTestament() {
      return this.getScripture('Matthew1:1', this.options);
    }

    getProverb() {
      return this.getScripture('Proverbs1:1', this.options);
    }

    getEveningDevotional() {
      // 1 old testament
      // get 3 psalms for the day
      const oldTest = getOldTestament();
      const psalms = getPsalms();

      return Promise.all([oldTest, psalms]).then(results => {
        return results[0].toString() + results[1].toString();
      }).catch(console.error.bind(console));
  }

  getOldTestament() {
    return this.getScripture('Genesis1:1');
  }

  getPsalms() {
    return this.getScripture('Psalms1:1', this.options);
  }

    getScripture(query, options) {
      return axios.get(this.url + query, { headers: { "Authorization": apiKey}})
      .then(results => {
        return results.data.passages[0];
      }).catch(console.error.bind(console));
    }
}
