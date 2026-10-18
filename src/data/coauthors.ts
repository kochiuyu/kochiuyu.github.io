export interface CoauthorInfo {
  name: string;
  url: string;
  affiliation: string;
  role?: string;
}

export const COAUTHORS_REGISTRY: Record<string, CoauthorInfo> = {
  'Anthony Creane': {
    name: 'Anthony Creane',
    url: 'https://gatton.uky.edu/people/anthony-creane',
    affiliation: 'University of Kentucky',
    role: 'Professor of Economics, Gatton College of Business and Economics',
  },
  'Bo Shen': {
    name: 'Bo Shen',
    url: 'https://ems.whu.edu.cn/',
    affiliation: 'Wuhan University',
    role: 'Associate Professor, School of Economics and Management',
  },
  'Charles Ka Yui Leung': {
    name: 'Charles Ka Yui Leung',
    url: 'https://www.cb.cityu.edu.hk/staff/kycleung/',
    affiliation: 'City University of Hong Kong',
    role: 'Associate Professor, Department of Economics and Finance',
  },
  'Duozhe Li': {
    name: 'Duozhe Li',
    url: 'https://research.cuhk.edu.hk/en/persons/duozhe-li/',
    affiliation: 'The Chinese University of Hong Kong',
    role: 'Associate Professor, Department of Economics',
  },
  'Fengjiao Chen': {
    name: 'Fengjiao Chen',
    url: 'https://www.econ.cuhk.edu.hk/',
    affiliation: 'The Chinese University of Hong Kong',
    role: 'Department of Economics',
  },
  'Hideo Konishi': {
    name: 'Hideo Konishi',
    url: 'https://www.bc.edu/bc-web/schools/morrissey/departments/economics/people/faculty-directory/konishi-hideo.html',
    affiliation: 'Boston College',
    role: 'Professor of Economics, Morrissey College of Arts and Sciences',
  },
  'Inácio Bó': {
    name: 'Inácio Bó',
    url: 'https://inaciobo.com/',
    affiliation: 'University of Macau',
    role: 'Associate Professor of Economics, Faculty of Business Administration',
  },
  'Inacio Bo': {
    name: 'Inácio Bó',
    url: 'https://inaciobo.com/',
    affiliation: 'University of Macau',
    role: 'Associate Professor of Economics, Faculty of Business Administration',
  },
  'Jens Gudmundsson': {
    name: 'Jens Gudmundsson',
    url: 'https://www.ku.dk/ifro/en/employees/577907',
    affiliation: 'University of Copenhagen',
    role: 'Assistant Professor, Department of Food and Resource Economics (IFRO)',
  },
  'Jens Leth Hougaard': {
    name: 'Jens Leth Hougaard',
    url: 'https://www.ku.dk/ifro/en/employees/115743',
    affiliation: 'University of Copenhagen',
    role: 'Professor of Applied Microeconomics, Department of Food and Resource Economics (IFRO)',
  },
  'Jens Hougaard': {
    name: 'Jens Leth Hougaard',
    url: 'https://www.ku.dk/ifro/en/employees/115743',
    affiliation: 'University of Copenhagen',
    role: 'Professor of Applied Microeconomics, Department of Food and Resource Economics (IFRO)',
  },
  'Jinghan Cai': {
    name: 'Jinghan Cai',
    url: 'https://www.scranton.edu/directory/profiles/economics-finance-and-intl-bus/jinghan-cai.shtml',
    affiliation: 'University of Scranton',
    role: 'Professor of Finance, Kania School of Management',
  },
  'Jingyi Xue': {
    name: 'Jingyi Xue',
    url: 'https://economics.smu.edu.sg/research/economic-policy-influence/prof-jingyi-xue',
    affiliation: 'Singapore Management University',
    role: 'Associate Professor, School of Economics',
  },
  'Le Xia': {
    name: 'Le Xia',
    url: 'https://www.bbvaresearch.com/en/author/lexia/',
    affiliation: 'BBVA Research',
    role: 'Chief Economist for Asia',
  },
  'Manyi Fan': {
    name: 'Manyi Fan',
    url: 'https://www.cb.cityu.edu.hk/staff/manyifan/',
    affiliation: 'City University of Hong Kong',
    role: 'Department of Accountancy, College of Business',
  },
  'Mark Koyama': {
    name: 'Mark Koyama',
    url: 'https://mason.gmu.edu/~mkoyama2/About.html',
    affiliation: 'George Mason University',
    role: 'Professor of Economics, Department of Economics',
  },
  'Rong Ding': {
    name: 'Rong Ding',
    url: 'https://ideas.repec.org/e/pdi79.html',
    affiliation: 'University of International Business and Economics (UIBE)',
    role: 'Associate Professor, School of International Trade and Economics',
  },
  'Ruben Juarez': {
    name: 'Ruben Juarez',
    url: 'https://rubenj.net/',
    affiliation: 'University of Hawaii at Mānoa',
    role: 'HMSA Distinguished Endowed Professor of Economics & UHERO',
  },
  'Tuan-Hwee Sng': {
    name: 'Tuan-Hwee Sng',
    url: 'https://fass.nus.edu.sg/ecs/people/sng-tuan-hwee/',
    affiliation: 'National University of Singapore',
    role: 'Associate Professor, Department of Economics',
  },
  'Xuyao Zhang': {
    name: 'Xuyao Zhang',
    url: 'https://lkyspp.nus.edu.sg/aci',
    affiliation: 'National University of Singapore (ACI)',
    role: 'Research Fellow & Deputy Director, Asia Competitiveness Institute',
  },
  'Yangyi Deng': {
    name: 'Yangyi Deng',
    url: 'https://grad.bschool.cuhk.edu.hk/students/deng-yangyi/',
    affiliation: 'CUHK Business School',
    role: 'Ph.D. Student, CUHK Business School',
  },
  'Yuming Li': {
    name: 'Yuming Li',
    url: 'https://business.fullerton.edu/engagement/real-estate/faculty-profiles?user=yli@fullerton.edu',
    affiliation: 'California State University, Fullerton',
    role: 'Professor of Finance, College of Business and Economics',
  },
};

/**
 * Normalizes author name and looks up coauthor information
 */
export function getCoauthorInfo(rawName: string): CoauthorInfo | null {
  const trimmed = rawName.trim();
  if (COAUTHORS_REGISTRY[trimmed]) {
    return COAUTHORS_REGISTRY[trimmed];
  }

  // Case-insensitive fallback
  const lower = trimmed.toLowerCase();
  for (const [key, value] of Object.entries(COAUTHORS_REGISTRY)) {
    if (key.toLowerCase() === lower) {
      return value;
    }
  }

  return null;
}
