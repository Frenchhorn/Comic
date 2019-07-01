import { Source } from '../constants/source';

interface Chapter {
  name: string;
}

export interface Comic {
  title: string;        // 标题
  author?: string;      // 作者
  description?: string; // 简介
  cover: string;        // 封面
  source: Source;       // 来源
  cid?: string;         // id
  highlight?: boolean;  // 是否高亮，用于"收藏"
  update?: string;      // 更新时间
  finish?: boolean;     // 是否完结
  local?: boolean;      // 是否来自本地
  favorite?: boolean;   // 是否来自收藏
  download?: boolean;   // 是否来自下载
  last?: string;        // 最后一话
  chapter?: string;     // 最近阅读章节
  page?: number;        // 最近阅读页码
  chapters?: Chapter[]; // 章节
}
