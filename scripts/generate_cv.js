import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  
  const fontRegular = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const pageWidth = 612; // Letter width (8.5 x 11 in)
  const pageHeight = 792;
  const leftMargin = 54;
  const rightMargin = 54;
  const contentWidth = pageWidth - leftMargin - rightMargin;
  const topMargin = 54;
  const bottomMargin = 54;

  const colorBlack = rgb(0.1, 0.1, 0.1);

  // Helper to wrap text into lines
  function wrapText(text, font, size, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, size);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // --- PAGE 1 ---
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - topMargin;

    // Header Title
    page.drawText('Chiu Yu Ko', {
      x: leftMargin,
      y: y,
      size: 20,
      font: fontRegular,
      color: colorBlack,
    });

    // Contact block on right
    const rightColX = 360;
    const rightLines = [
      'Phone: (852) 3943-9799',
      'Fax: (852) 2603-5104',
      'Email: chiuyuko@cuhk.edu.hk',
      'Website: kochiuyu.github.io'
    ];
    let ry = y;
    for (const rline of rightLines) {
      page.drawText(rline, {
        x: rightColX,
        y: ry,
        size: 10,
        font: fontRegular,
        color: colorBlack,
      });
      ry -= 14;
    }

    y -= 22;
    const leftLines = [
      'Department of Decisions, Operations and Technology',
      'Chinese University of Hong Kong',
      '9/F, Cheng Yu Tung Building',
      'Shatin, N.T., Hong Kong'
    ];
    for (const lline of leftLines) {
      page.drawText(lline, {
        x: leftMargin,
        y: y,
        size: 10,
        font: fontRegular,
        color: colorBlack,
      });
      y -= 14;
    }

    y -= 15;

    // Position
    page.drawText('Position', {
      x: leftMargin,
      y: y,
      size: 14,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    const positions = [
      'Associate Professor, Department of Decisions, Operations and Technology, Chinese University of Hong Kong, 2023–Present',
      'Associate Professor, Department of Decision Sciences and Managerial Economics, Chinese University of Hong Kong, 2020–2023',
      'Associate Professor (by courtesy), Department of Economics, Chinese University of Hong Kong, 2023–Present',
      'Assistant Professor, Department of Economics, National University of Singapore, 2012–2020.',
      'Member, Institute of Operation Research and Analytics, National University of Singapore, 2017–2020.'
    ];

    for (const pos of positions) {
      const lines = wrapText(pos, fontRegular, 10, contentWidth - 14);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + 14,
          y: y,
          size: 10,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13.5;
      }
      y -= 3.5;
    }

    y -= 10;

    // Administrative Appointments
    page.drawText('Administrative Appointments', {
      x: leftMargin,
      y: y,
      size: 14,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    const adminAppointments = [
      'Associate Director, Master of Science Programme in Information and Technology Management',
      'Associate Director, Aviation Policy Research Centre'
    ];
    for (const app of adminAppointments) {
      page.drawText(app, {
        x: leftMargin + 14,
        y: y,
        size: 10,
        font: fontRegular,
        color: colorBlack,
      });
      y -= 16;
    }

    y -= 10;

    // Research Interest
    page.drawText('Research Interest', {
      x: leftMargin,
      y: y,
      size: 14,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    page.drawText('Primary: Applied Game Theory, Industrial Organization', {
      x: leftMargin + 14,
      y: y,
      size: 10,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 15;
    page.drawText('Secondary: Public Economics, Financial Economics', {
      x: leftMargin + 14,
      y: y,
      size: 10,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 25;

    // Education
    page.drawText('Education', {
      x: leftMargin,
      y: y,
      size: 14,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    const education = [
      'Ph.D. Economics, Boston College, 2012.',
      'M.A. Economics, Boston College, 2009.',
      'M.Phil. Economics, Chinese University of Hong Kong, 2007.',
      'B.B.A. Insurance Financial and Actuarial Analysis, Chinese University of Hong Kong, 2005.'
    ];
    for (const edu of education) {
      page.drawText(edu, {
        x: leftMargin + 14,
        y: y,
        size: 10,
        font: fontRegular,
        color: colorBlack,
      });
      y -= 16;
    }
  }

  // Header helper for pages 2 to 8
  function drawPageHeader(page, pageNum) {
    page.drawText('Chiu Yu Ko', {
      x: leftMargin,
      y: pageHeight - topMargin + 15,
      size: 10,
      font: fontItalic,
      color: colorBlack,
    });
    page.drawText(`${pageNum}`, {
      x: pageWidth - rightMargin - 10,
      y: pageHeight - topMargin + 15,
      size: 10,
      font: fontRegular,
      color: colorBlack,
    });
  }

  // --- PAGE 2 ---
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageHeader(page, 2);
    let y = pageHeight - topMargin;

    page.drawText('Research', {
      x: leftMargin,
      y: y,
      size: 14,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    page.drawText('Publications', {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontItalic,
      color: colorBlack,
    });
    y -= 16;

    const publicationsP2 = [
      '1. How would a monopsony employer hurt labor? A simple dynamic model. Economic Modelling, 2026, 107716. (with Charles Leung)',
      '2. Automated conflict resolution: Sharing sequentially triggered losses. Management Science, 70(3), 2024: 1773-1786. (with Jens Gudmundsoon and Jens Hougaard).',
      '3. A conceptual model for FRAND royalty setting. Mathematical Social Science, 123, (2023):167-176. (with Jens Hougaard and Xuyao Zhang).',
      '4. Sleeplessness, Distraction, and Stock Market Performance: Evidence from the World Cup. Global Finance Journal, 56, (2023): 100823. (with Jinghan Cai and Manyi Fan).',
      '5. Can corruption encourage clean technology transfer? Journal of Public Economic Theory, 25, (2022): 459-492 (with Bo Shen and Xuyao Zhang).',
      '6. Partial compatibility in two-sided markets: Equilibrium and welfare analysis. Economic Modelling, 116, (2022): 105989 (with Rong Ding and Bo Shen).',
      '7. A Welfare Analysis of Licensing under Rent Dissipation. Economic Modelling, 105, (2021): 10565. (with Rong Ding).',
      '8. Are Dominant Platforms Good for Consumers? Economic Inquiry, 59, (2021): 1364-1377. (with Bo Shen)',
      '9. Competitive Screening and Information Transmission. Journal of Public Economic Theory, 23, (2021): 407–437. (with Inacio Bo)',
      '10. Choosing a Production Joint Venture Partner. Journal of Institutional and Theoretical Economics, 176, (2020): 665–685. (with Rong Ding and Bo Shen)',
      '11. Decentralized One-to-many bargaining. International Economic Review, 61, (2020): 39–72. (with Duozhe Li)',
      '12. Research Joint Venture with technology transfer. Canadian Journal of Economics, 53, (2020): 341-358. (with Xuyao Zhang)',
      '13. Decentralized Mechanisms for River Sharing. Journal of Environmental Economics and Management, 94, (2019): 67–81. (with Jens Gudmundsoon and Jens Hougaard)',
      '14. Hide and Seek: Uninformed Traders and the Short-sales Constraints, Annals of Economics and Finance, 20(1), 319-356. (with Jinghan Cai, Yuming Li and Le Xia).',
      '15. Sharing Sequential Value in a Network. Journal of Economic Theory, 177, (2018): 734-799. (with Ruben Juarez and Jingyi Xue)',
      '16. On the Role of Outside Options in Wage Renegotiation. Journal of Economics & Management Strategy, 27(4), 2018: 792-803. (with Fengjiao Chen and Duozhe Li)'
    ];

    for (const pub of publicationsP2) {
      const lines = wrapText(pub, fontRegular, 9.5, contentWidth - 14);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + (i === 0 ? 0 : 16),
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 4;
    }
  }

  // --- PAGE 3 ---
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageHeader(page, 3);
    let y = pageHeight - topMargin;

    const remainingPubs = [
      '17. Unified China and Divided Europe. International Economic Review, 59(1), (2018): 285-327. (with Mark Koyama, and Tuan-Hwee Sng)',
      '18. A Note on Budget Constraints and Outside Option in Common Agency. Theory and Decision, 83(1), (2017): 95-106.',
      '19. Regional Dependence and Political Centralization in Imperial China. Eurasian Geography and Economics, 54, (2014): 470–483. (with Tuan-Hwee Sng)',
      '20. Choosing a Licensee from Heterogeneous Rivals. Games and Economic Behavior, 82, (2013): 254–268. (with Anthony Creane and Hideo Konishi)',
      '21. Profit-maximizing Matchmaker. Games and Economic Behavior, 75, (2012): 217–232. (with Hideo Konishi)'
    ];

    for (const pub of remainingPubs) {
      const lines = wrapText(pub, fontRegular, 9.5, contentWidth - 14);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + (i === 0 ? 0 : 16),
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 4;
    }

    y -= 10;
    page.drawText('Working Paper', {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontItalic,
      color: colorBlack,
    });
    y -= 16;

    const workingPapers = [
      '22. Interaction-Adjusted Concentration: A Quadratic Generalization of the HHI (with Yangyi Deng)',
      '23. Ranking Scholars When Journals and Citations Matter (with Yangyi Deng)',
      '24. Incentive-compatible public transport fares with random inspection. (with Inacio Bo)',
      '25. Vertical cross-licensing. (with Bo Shen and Xuyao Zhang)',
      '26. Sharing Profit by Ranking Partners (with Lining Han, Ruben Juarez and Jung S. You)'
    ];

    for (const wp of workingPapers) {
      const lines = wrapText(wp, fontRegular, 9.5, contentWidth - 14);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + (i === 0 ? 0 : 16),
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 4;
    }

    y -= 10;
    page.drawText('Others', {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontItalic,
      color: colorBlack,
    });
    y -= 16;

    const others = [
      '27. Case Study "HKTVmall: Responding to Shortages during the COVID-19 Pandemic," Ivey Business School Case Series, 2023: W33330. (with Nouri Najjar and Adam Fremeth)',
      '28. Book chapter "Sleep deprivation and stock markets." In Encyclopedia of Monetary Policy, Financial Markets and Banking, edited by Nikolaos Apergis, and published by Elsevier, accepted (with Jinghan Cai and Manyi Fan)',
      '29. Book review "Market Design: Auction and Matching" by Guillaume Haeringer, MIT Press 2018. In Economic Record, 2019.'
    ];

    for (const o of others) {
      const lines = wrapText(o, fontRegular, 9.5, contentWidth - 14);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + (i === 0 ? 0 : 16),
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 4;
    }

    y -= 10;
    page.drawText('Grant and Award', {
      x: leftMargin,
      y: y,
      size: 14,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    const grantsP3 = [
      'Faculty Teaching Merit Award, Business School, Chinese University of Hong Kong, 2024–2025',
      'Research Data Management Development Fund, Chinese University of Hong Kong, 2024–2025',
      'Innovation in Business Education, Business School, Chinese University of Hong Kong, 2024',
      'Direct Research Grant, Business School, Chinese University of Hong Kong, 2023–2024',
      'Research Incentive Scheme, Chinese University of Hong Kong, 2023–2024.'
    ];

    for (const g of grantsP3) {
      const lines = wrapText(g, fontRegular, 9.5, contentWidth - 14);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + 14,
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 3;
    }
  }

  // --- PAGE 4 ---
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageHeader(page, 4);
    let y = pageHeight - topMargin;

    const grantsP4 = [
      'Mainland and Taiwan Strategic Partnership Development Programme, Chinese University of Hong Kong, 2023–2024.',
      'General Research Fund (GRF), University Grant Committee (UGC), 2024-2027.',
      'Direct Research Grant, Business School, Chinese University of Hong Kong, 2022–2023.',
      'Beijing-Hong Kong University Alliance (BHUA) Grant, 2022-2023.',
      'Direct Research Grant, Business School, Chinese University of Hong Kong, 2021–2022.',
      'Tier 1 Research Grant, Ministry of Education, Singapore, 2017–2019.',
      'Faculty Long Service Awards, Faculty of Arts and Social Sciences, National University of Singapore, 2017.',
      'Tier 1 Research Grant , Ministry of Education, Singapore, 2015–2018.',
      'Teaching Enhancement Grant, National University of Singapore, 2014–2015.',
      'Reading Group, National University of Singapore, 2013–2015.',
      'Startup Research Grant, National University of Singapore, 2012–2015.',
      'Dissertation Fellowship, Department of Economics, Boston College, 2012.',
      'Dissertation Fellowship, Graduate Schools of Arts and Social Sciences , Boston College, 2011.',
      'Selected Students, 1st São Paulo School of Advanced Sciences on Game Theory, 2010.',
      'Summer Research Award, Department of Economics, Boston College, 2009.'
    ];

    for (const g of grantsP4) {
      const lines = wrapText(g, fontRegular, 9.5, contentWidth - 14);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + 14,
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 3;
    }

    y -= 10;
    page.drawText('Conference and Seminar', {
      x: leftMargin,
      y: y,
      size: 14,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    const confsP4 = [
      { year: '2026', text: 'Peking University; Social Choice and Welfare (University of Tokyo); Econometric Society Meeting China (University of Hong Kong); Asia Game Theory Conference (Waseda University);' },
      { year: '2025', text: 'Greater Bay Area Economics Conference; Greater Bay Area Economics Summer Meeting; CUHK Workshop on Industrial Economics; Asia-Pacific Industrial Organization Conference (University of Queensland)' },
      { year: '2024', text: 'CUHK-CDJ Joint Workshop of Economic Theory; Shandong University; Lingnan International Conference on Competition Policy; SUSTECH-SZU Micro Theory and Experiments Workshop; East Asian Game Theory; Renmin University' },
      { year: '2023', text: 'Central University of Finance and Economics; Science of Decision Making (University of Hong Kong); Asia Econometric Society Meeting (Nanyang Technological University); Science of Decision Making (University of Hong Kong); Society of Advancement of Economic Theory (University of Paris 1 Pantheon-Sorbonne and the FIAP Jean Monnet Paris); Shandong Microeconomic and Behavioural Summer Meeting; CRESSE-Lingnan International Conference on Competition Policy; Macau Market Design Workshop (University of Macau)' }
    ];

    for (const c of confsP4) {
      page.drawText(c.year, {
        x: leftMargin,
        y: y,
        size: 9.5,
        font: fontBold,
        color: colorBlack,
      });
      const lines = wrapText(c.text, fontRegular, 9.5, contentWidth - 40);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + 36,
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 4;
    }
  }

  // --- PAGE 5 ---
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageHeader(page, 5);
    let y = pageHeight - topMargin;

    const confsP5 = [
      { year: '2022', text: 'Society of Advancement of Economic Theory Conference (SAET); Conference on Mechanism and Institution Design (CMiD)' },
      { year: '2021', text: 'Society of Advancement of Economic Theory Conference (SAET); Hong Kong University of Science and Technology IO Workshop; Lingnan University' },
      { year: '2020', text: 'Academia Sinica; ESSEC Business School' },
      { year: '2019', text: 'International Conference in Microeconomics (Korea University); Singapore Economic Review Conference (SERC); Southwest Economic Theory Workshop (Southwest University of Finance and Economics); Australian National University; University of Melbourne; Deakin Theory Workshop (Deakin University); Academia Sinica; New York University-Shanghai; Chinese University of Hong Kong; City University of Hong Kong; Sungkyunkwan University' },
      { year: '2018', text: 'University of Copenhagen; Meeting of European Association for Research in Industrial Economics (EARIE, Athens); Meeting of Society of Social Choice and Welfare (SSCW, South Korea); Asian Law & Economics Association Conference (ALEA); Society of Advancement of Economic Theory Conference (SAET); Seoul National University; Korea University' },
      { year: '2017', text: 'Asia School of Business; Singapore Economic Review Conference (SERC); East Asian Game Theory Conference (EAGT); Conference on Economic Design (SED, York); Econometric Society Asia Meeting (Chinese University of Hong Kong); City University of Hong Kong; Annual Searle Roundtable on Patent and Technology Standards (Northwestern University); Sun Yat-sen University' },
      { year: '2016', text: 'Distributive Justice and Economic Theory (Seoul National University); Applying Game Theory to Humanities (Korea Institute of Advanced Studies); Workshop on Game Theory and Application (Chinese University of Hong Kong); Singapore Joint Economic Theory Workshop; World Congress of Game Theory Society (GAMES, Maastricht); European Game Theory Meeting (SING 12, Odense); Meeting of Society of Social Choice and Welfare (SSCW, Lund); Taipei Conference on Growth, Trade and Development (Academia Sinica)' },
      { year: '2015', text: 'Academic Sinica; Shanghai University of Finance and Economics; East Asian Game Theory Conference (EAGT, Waseda University); Conference on Economic Design (SED); Joint Conferences on "Logic, Game Theory, and Social Choice" and "Pan-Pacific Conference on Game Theory" (Academia Sinica); Nanyang Technological University; 2015 Workshop on Business, Consumer and Social Insight (Singapore Management University)' },
      { year: '2014', text: 'Academic Sinica; Society of Advancement of Economic Theory Conference (SAET, Waseda University); Meeting of Society of Social Choice and Welfare (SSCW, Boston College)' },
      { year: '2013', text: 'Multi-sided Platform Workshop (National University of Singapore); Econometric Society Asia Meeting (Singapore); Society of Advancement of Economic Theory Conference (SAET, MINES ParisTech); Public Economic Theory (PET 13 Lisbon)' },
      { year: '2012', text: 'Biennial Conference of Hong Kong Economic Association (HKEA); Public Economic Theory (PET 12 Taipei)' }
    ];

    for (const c of confsP5) {
      page.drawText(c.year, {
        x: leftMargin,
        y: y,
        size: 9.5,
        font: fontBold,
        color: colorBlack,
      });
      const lines = wrapText(c.text, fontRegular, 9.5, contentWidth - 40);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + 36,
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 4;
    }
  }

  // --- PAGE 6 ---
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageHeader(page, 6);
    let y = pageHeight - topMargin;

    const confsP6 = [
      { year: '2011', text: 'Midwest Economic Theory and International Trade Meeting; Public Economic Theory (PET 11 Indiana)' },
      { year: '2010', text: 'Brazilian Workshop of Game Theory Society (BWGT); Jerusalem School of Economic Theory' }
    ];

    for (const c of confsP6) {
      page.drawText(c.year, {
        x: leftMargin,
        y: y,
        size: 9.5,
        font: fontBold,
        color: colorBlack,
      });
      const lines = wrapText(c.text, fontRegular, 9.5, contentWidth - 40);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + 36,
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 4;
    }

    y -= 10;
    page.drawText('Professional Activities', {
      x: leftMargin,
      y: y,
      size: 14,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    const revText = 'Reviewer for Australian Economics Paper, Economic Bulletin, Economic Record, Games and Economic Behavior, International Economic Review, International Journal of Game Theory, Journal of the Association of Environmental and Resource Economists, Journal of Economics and Management Strategy, Journal of Economic Behavior and Organization, Journal of Mathematical Economics, Journal of Public Economic Theory, Manchester School, Mathematical Social Science, Management and Decision Economics, Management Science, Review of Network Economics, Review of Economic Dynamics, Singapore Economic Review, Social Choice and Welfare, Theory and Decision.';
    const revLines = wrapText(revText, fontRegular, 9.5, contentWidth);
    for (const line of revLines) {
      page.drawText(line, {
        x: leftMargin,
        y: y,
        size: 9.5,
        font: fontRegular,
        color: colorBlack,
      });
      y -= 13;
    }
    y -= 5;

    const activities = [
      'Organizer, Greater Bay Area Economics Workshop',
      'Co-organizer, CUHK-CDJ Joint Workshop of Economic Theory',
      'Co-investigator, National Natural Science Foundation of China General Program, 2024–2027.',
      'Co-organizer, Department Brownbag Workshop, Chinese University of Hong Kong, 2023–Present.',
      'Organizer, Mainland-Hong Kong Workshop of Market Power, Chinese University of Hong Kong, Jun 2023.',
      'Organizer, Second Singapore Economics PhD Conference, National University of Singapore, Nov 2016.',
      'Advisor, Graduate Student Reading Group (Applied Economic Theory), Department of Economics, National University of Singapore, 2015–2016.',
      'Coordinator, Reading Group (Applied Theory and Industrial Organization), Department of Economics, National University of Singapore, 2012–2019.',
      'Co-investigator, Tier 1 Research Grant , Ministry of Education, Singapore, 2015–2018.',
      'Advisor, Graduate Student Reading Group (Applied Economic Theory and Industrial Organization), Department of Economics, National University of Singapore, 2013–2014.',
      'Co-organizer, Multi-sided Platform Workshop, National University of Singapore, Dec 2013.',
      'Departmental Service, Department of Decision Science and Managerial Economics, Chinese University of Hong Kong, 2020–present:',
      '   Seminar Committee (2020–2021).',
      '   Curriculum Committee Chair (2021–)',
      '   Department Assessment Panel (2020–)',
      '   Teaching Assistant Coordinator (2021–2025).',
      '   Course coordinator: Statistical Analysis for Business Decision (2025–)'
    ];

    for (const act of activities) {
      const isIndent = act.startsWith('   ');
      const lines = wrapText(act.trim(), fontRegular, 9.5, contentWidth - (isIndent ? 28 : 14));
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + (isIndent ? 28 : 14),
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 2.5;
    }
  }

  // --- PAGE 7 ---
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageHeader(page, 7);
    let y = pageHeight - topMargin;

    const nusService = [
      'Departmental Service, Department of Economics, National University of Singapore, 2012–2020:',
      '   Graduate Committee (2013–2014, 2017–2018).',
      '   Applied Economics Program (2014–2015, 2017–2019).',
      '   Subcommittee on collaborative programs: double degree programs (2018–2019).',
      'External Service, Specialist Referee in Economic and Financial Modeling, S.T. Yau High School Science Award (Asia), 2022.'
    ];

    for (const s of nusService) {
      const isIndent = s.startsWith('   ');
      const lines = wrapText(s.trim(), fontRegular, 9.5, contentWidth - (isIndent ? 28 : 14));
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + (isIndent ? 28 : 14),
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 2.5;
    }

    y -= 10;
    page.drawText('Teaching', {
      x: leftMargin,
      y: y,
      size: 14,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    page.drawText('Presentation/Software', {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontItalic,
      color: colorBlack,
    });
    y -= 16;

    const presSoftware = [
      'Using formative feedback, peer review, and online video-recorded presentations to enhance students\' research reports. CDTL Brief, 19(1), 3-9.',
      'FASS Teaching Seminar, National University of Singapore, 16 Aug 2016.',
      'R package, CandleStickPattern (2019), https://github.com/kochiuyu/CandleStickPattern'
    ];

    for (const ps of presSoftware) {
      const lines = wrapText(ps, fontRegular, 9.5, contentWidth - 14);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + 14,
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 3;
    }

    y -= 8;
    page.drawText('Chinese University of Hong Kong', {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontItalic,
      color: colorBlack,
    });
    y -= 16;

    const cuhkTeaching = [
      'Microeconomic Theory (Ph.D.): Fall 2021, Fall 2022, Fall 2023, Fall 2024, Fall 2025, Fall 2026',
      'Statistical Analysis (Master): Fall 2023, Fall 2024, Fall 2025, Fall 2026',
      'Low Altitude Economics (Master): Fall 2026',
      'Economics for Finance Practice (Master): Spring 2023',
      'Game Theory for Business Strategy (Undergraduate): Fall 2026',
      'Statistical Analysis for Business Decision (Undergraduate): Fall 2020, Fall 2021, Fall 2022, Fall 2023, Fall 2024',
      'STudent-oriented Teaching and Seminar (Undergraduate): Spring 2025'
    ];

    for (const ct of cuhkTeaching) {
      const lines = wrapText(ct, fontRegular, 9.5, contentWidth - 14);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + 14,
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 2.5;
    }

    y -= 8;
    page.drawText('National University of Singapore', {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontItalic,
      color: colorBlack,
    });
    y -= 16;

    const nusTeaching = [
      'Industrial Organization (Ph.D.): Fall 2012, Fall 2013, Fall 2014, Fall 2015, Fall 2016.',
      'Applied Financial Economics (Master): Spring 2017, Spring 2018, Spring 2019.',
      'Financial Market Microstructure (Undergraduate Honor): Fall 2015, Fall 2016, Fall 2017, Spring 2017, Fall 2018, Spring 2019, Fall 2019.',
      'Microeconomics Analysis III (Undergraduate Honor): Fall 2012, Fall 2013, Spring 2015.'
    ];

    for (const nt of nusTeaching) {
      const lines = wrapText(nt, fontRegular, 9.5, contentWidth - 14);
      for (let i = 0; i < lines.length; i++) {
        page.drawText(lines[i], {
          x: leftMargin + 14,
          y: y,
          size: 9.5,
          font: fontRegular,
          color: colorBlack,
        });
        y -= 13;
      }
      y -= 2.5;
    }

    y -= 8;
    page.drawText('Boston College', {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontItalic,
      color: colorBlack,
    });
    y -= 16;

    page.drawText('Statistics (Undergraduate): Spring 2011, Fall 2011.', {
      x: leftMargin + 14,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
  }

  // --- PAGE 8 ---
  {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    drawPageHeader(page, 8);
    let y = pageHeight - topMargin;

    page.drawText('Advising', {
      x: leftMargin,
      y: y,
      size: 14,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    page.drawText('Chinese University of Hong Kong', {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontItalic,
      color: colorBlack,
    });
    y -= 16;

    page.drawText('Ph.D. Students, Primary Advisor:', {
      x: leftMargin + 14,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 14;

    page.drawText('Xinyan Liu (2024), Yangyi Deng (2027), Guohao Li (2028), Cao Yinglyu (2029)', {
      x: leftMargin + 28,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 20;

    page.drawText('National University of Singapore', {
      x: leftMargin,
      y: y,
      size: 11,
      font: fontItalic,
      color: colorBlack,
    });
    y -= 16;

    page.drawText('Ph.D. Students, Primary Advisor:', {
      x: leftMargin + 14,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 14;

    page.drawText('Xuyao Zhang (2017), Zhiqi Lu (2020)', {
      x: leftMargin + 28,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 18;

    page.drawText('Ph.D. Students, Committee:', {
      x: leftMargin + 14,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 14;

    page.drawText('Rong Ding (2015), Xuyuan Liu (2015), Bin Liu (2016), Zhe Wang (2017)', {
      x: leftMargin + 28,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 20;

    page.drawText('Undergraduate Honors Thesis:', {
      x: leftMargin + 14,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 14;

    const undergradThesis = 'Bhaniramka Akshat (2019), Mimani Tanvi (2019), Lim Wei Yan Bryan (2018), Mudit Kedia (2018), Chew Pheeraphol (2018), Shiang Chen Ting (2018), Lim Si Min Sally (2018), Soh Giap Hong Daniel (2017), Chia Keat Loong (2016), Evelyn Chew Yu Hui (2016), Nguyen Hoang Diem An (2015 Spring), Chew Yi Peng Lisa (2015), Ngiaw Kee Ann (2014), Oon Wei Ying (2014), Zhe Michelle Dong (2014), Anushiya Arunan (2014), Edmund Chua Zheng Hong (2014), Jonathan Ne Win (2013)';
    const utLines = wrapText(undergradThesis, fontRegular, 9.5, contentWidth - 28);
    for (const line of utLines) {
      page.drawText(line, {
        x: leftMargin + 28,
        y: y,
        size: 9.5,
        font: fontRegular,
        color: colorBlack,
      });
      y -= 13;
    }
    y -= 10;

    page.drawText('Undergraduate Independent Studies:', {
      x: leftMargin + 14,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 14;

    const indepStudies = 'Jesslyn Zeng (2019), Chan Yong (2019), Shi Huilin (2018), Wu Jieli (2016), Koh Zhi Xing (2015)';
    const isLines = wrapText(indepStudies, fontRegular, 9.5, contentWidth - 28);
    for (const line of isLines) {
      page.drawText(line, {
        x: leftMargin + 28,
        y: y,
        size: 9.5,
        font: fontRegular,
        color: colorBlack,
      });
      y -= 13;
    }
    y -= 10;

    page.drawText('Undergraduate Research Opportunity Program:', {
      x: leftMargin + 14,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 14;

    page.drawText('Lin Ja He (2015), Lim Hysen (2015)', {
      x: leftMargin + 28,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
    y -= 35;

    page.drawText('Last updated: September 4, 2026', {
      x: leftMargin,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: colorBlack,
    });
  }

  const pdfBytes = await pdfDoc.save();

  // Save to public/files/cv.pdf, files/cv.pdf, and dist/files/cv.pdf
  const targets = [
    path.join(process.cwd(), 'public', 'files', 'cv.pdf'),
    path.join(process.cwd(), 'files', 'cv.pdf'),
    path.join(process.cwd(), 'dist', 'files', 'cv.pdf')
  ];

  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, pdfBytes);
    console.log(`Saved updated CV to ${target} (${pdfBytes.length} bytes)`);
  }
}

generateCV().catch(err => {
  console.error(err);
  process.exit(1);
});
