import { environment } from '../../environments/environment';

export const DMZJ = {
  SEARCH_URL: 'http://s.acg.dmzj.com/comicsum/search.php?s={{keyword}}',
  ITEM_URL: 'http://v2.api.dmzj.com/comic/{{cid}}.json'
};

export const DMZJ2 = {
  SEARCH_URL: 'http://v2.api.dmzj.com/search/show/0/{{keyword}}/{{page}}.json',
  ITEM_URL: 'http://m.dmzj.com/info/{{cid}}.html'
};

if (!environment.production) {
  DMZJ.SEARCH_URL = DMZJ.SEARCH_URL.replace('http://s.acg.dmzj.com', '/dmzj');
  DMZJ.ITEM_URL = DMZJ.ITEM_URL.replace('http://v2.api.dmzj.com', '/dmzj');
  DMZJ2.SEARCH_URL = DMZJ2.SEARCH_URL.replace('http://v2.api.dmzj.com', '/dmzj2');
  DMZJ2.ITEM_URL = DMZJ2.ITEM_URL.replace('http://m.dmzj.com', '/dmzj2');
}
