import { Source } from '../constants/source';

export interface Comic {
  source?: Source;
  cid?: string;
  title: string;
  cover: string;
  highlight?: boolean;
  local?: boolean;
  udpate?: string;
  finish?: boolean;
  favorite?: boolean;
  download?: boolean;
  last?: string;
  page?: number;
  chapter?: string;
  author?: string;
}
