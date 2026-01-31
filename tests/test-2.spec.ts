import { test, expect, Page, Locator } from '@playwright/test';


// ================= CONFIG TYPES =================
type Timeouts = {
  pageLoad: number;
  afterClear: number;
  translation: number;
  betweenTests: number;
};

type Selectors = {
  inputField: string;
  outputContainer: string;
};

const CONFIG: {
  url: string;
  timeouts: Timeouts;
  selectors: Selectors;
} = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer:
      'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};


// ================= TEST DATA TYPES =================
type TestCase = {
  tcId: string;
  name: string;
  input: string;
  expected: string;
  category: string;
  grammar: string;
  length: 'S' | 'M' | 'L';
};

type UiTestCase = {
  tcId: string;
  name: string;
  input: string;
  partialInput: string;
  expectedFull: string;
  category: string;
  grammar: string;
  length: 'S' | 'M' | 'L';
};

const TEST_DATA: {
  positive: TestCase[];
  negative: TestCase[];
  ui: UiTestCase;
} = {
  positive: [
    {
      tcId: 'Pos_Fun_001',
      name: 'Daily action statement',
      input: '  mama gedhara yannavaa',
      expected: 'මම ගෙදර යන්නවා',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_002',
      name: 'Expressing a need',
      input: 'mata watura oonee',
      expected: 'මට wඅටුර ඕනේ',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
   {
      tcId: 'Pos_Fun_003',
      name: 'Compound idea with cause',
      input: 'mama paasal giyaa, e nisaa passe enna baeri unaa',
      expected: 'මම පාසල් ගියා, එ නිසා පස්සෙ එන්න බැරි උනා',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'S'
    },
     {
      tcId: 'Pos_Fun_004',
      name: 'Conditional complex sentence',
      input: 'oyaa call karanavanam mama ennam',
      expected: 'ඔයා call කරනවනම් මම එන්නම්',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_005',
      name: 'Question about well-being',
      input: 'oyaa hondin innavada?',
      expected: 'ඔයා හොන්ඩින් ඉන්නවඩ?',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_006',
      name: 'Giving a direct instruction',
      input: 'issarahata yanna',
      expected: 'ඉස්සරහට යන්න',
      category: 'Daily language usage',
      grammar: ' Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_007',
      name: 'Present continuous action',
      input: 'mama pothak kiyavanavaa',
      expected: 'මම පොතක් කියවනවා',
      category: 'Daily language usage',
      grammar: 'Present tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_008',
      name: 'Compound idea',
      input: 'mama office giyaa, e nisaa lunch eka miss unaa',
      expected: 'මම office ගියා, එ නිසා lunch එක miss උනා',
      category: 'Mixed Singlish + English',
      grammar: 'Compound sentence',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_009',
      name: 'Plural pronoun usage',
      input: 'api sindhuvak kiyamu',
      expected: 'අපි සින්දුවක් කියමු',
      category: 'Daily language usage',
      grammar: 'Plural form',
      length: 'S',
    },
    {
      tcId: 'Pos_Fun_0010',
      name: 'Abbreviation handling',
      input: 'mata ID eka office eken labunaa',
      expected: 'මට ID එක office එකෙන් ලබුනා',
      category: 'Mixed Singlish + English',
      grammar: ' Past tense',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_0011',
      name: 'Multi-line conversation',
      input: 'mama gedhara yannavaa.oyaa kohedha inne?',
      expected: 'මම ගෙදර යන්නවා.ඔයා කොහෙද ඉන්නේ?',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Interrogative (question)',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_0012',
      name: 'Place name in sentence',
      input: 'api Galle yanna hadhanne',
      expected: 'අපි Galle යන්න හදන්නෙ',
      category: 'Names / places / common English words',
      grammar: 'Present tense',
      length: 'M',
    },
  {
      tcId: 'Pos_Fun_0013',
      name: 'Polite help request',
      input: 'karunaakaralaa magee document eka balanna puluvandha',
      expected: 'කරුනාකරලා මගේ document එක බලන්න පුලුවන්ද',
      category: ' Greeting / request / response ',
      grammar: 'future tense',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_0014',
      name: 'Future plan',
      input: 'api heta maatharadhi hamuvemu',
      expected: 'අපි හෙට මාතරදි හමුවෙමු',
      category: 'Daily language usage',
      grammar: 'Future tense',
      length: 'S',
    },
    {
      tcId: 'Pos_Fun_0015',
      name: 'Time format',
      input: 'bus eka 8.30 PM enavaa',
      expected: 'bus එක 8.30 PM එනවා',
      category: ' Punctuation / numbers ',
      grammar: 'Present tense',
      length: 'S',
    },
    {
      tcId: 'Pos_Fun_0016',
      name: 'Negative ability',
      input: 'mata eeka karanna baa',
      expected: 'මට ඒක කරන්න බා',
      category: ' Daily langu/age usage',
      grammar: 'Negation (negative form)',
      length: 'S',
    },
  {
      tcId: 'Pos_Fun_0017',
      name: 'Daily routine with sequence',
      input: 'mama udhe nagitala bath kalaa passe office yanna hadhanava',
      expected: 'මම උදෙ නගිටල බත් කලා පස්සෙ office යන්න හදනව',
      category: ' Daily language usage',
      grammar: 'Compond sentences',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_0018',
      name: 'Future condition',
      input: 'oyaa enavanam api movie ekak balamu',
      expected: 'ඔයා එනවනම් අපි movie එකක් බලමු',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_0019',
      name: 'Polite help request',
      input: 'karunaakarala mata me form eka fill karanna udhavvak denna puluvandha',
      expected: 'කරුනාකරල මට මෙ form එක fill කරන්න උදව්වක් ඩෙන්න පුලුවන්ද',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_0020',
      name: 'Cause and delay',
      input: 'traffic godak thibba nisaa mama meeting ekata tika pramaadha unaa',
      expected: 'traffic ගොඩක් තිබ්බ නිසා මම meeting එකට ටික ප්‍රමාද උනා',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_0021',
      name: 'Future group plan',
      input: 'api heta school ekata gihin teachers la hamuvemu kiyala hithanavaa',
      expected: 'අපි හෙට school එකට ගිහින් teachers ල හමුවෙමු කියල හිතනවා',
      category: 'Daily language usage',
      grammar: 'Future tense',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_0022',
      name: 'Question about plan',
      input: 'oyaa adha evening ekata api ekka dinner yanna enavadha kiyala ahanne',
      expected: 'ඔයා අද evening එකට අපි එක්ක dinner යන්න එනවද කියල අහන්නෙ',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_0023',
      name: 'Money transaction',
      input: 'mama bank ekata gihin Rs. 5000 deposit karala receipt ekak gaththaa',
      expected: 'මම bank එකට ගිහින් Rs. 5000 deposit කරල receipt එකක් ගත්තා',
      category: 'Punctuation / numbers',
      grammar: 'Compound sentence',
      length: 'M',
    },
    {
      tcId: 'Pos_Fun_0024',
      name: 'Long office work scenario',
      input: 'magee office eke aluth project ekak patan gaththaa eya IT team ekata adhaala nisaa api mulinma discussion ekak thiyala requirements tika hadhala client ekata presentation ekak dhunnaa eeta passe client kenek changes kihipayak illuva nisaa api aye design eka update karala final version eka submit kala',
      expected: 'මගේ office eke අලුත් project එකක් පටන් ගත්තා එය IT team එකට අදාල නිසා අපි මුලින්ම discussion එකක් තියල requirements ටික හදල client එකට presentation එකක් දුන්නා ඒට පස්සෙ client කෙනෙක් changes කිහිපයක් ඉල්ලුව නිසා අපි aye design එක update කරල final version එක submit කල',
      category: ' Mixed Singlish + English',
      grammar: ' Complex sentence',
      length: 'L',
    },




  ],

  negative: [
    {
      tcId: 'Neg_Fun_001',
      name: 'Incorrect pronoun spelling',
      input: 'oya hondin innwada?',
      expected: 'ඔයා හොඳින් ඉන්නවද?',
      category: 'Typographical error handling',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_002',
      name: 'Severe vowel removal',
      input: 'mta wtr one',
      expected: 'මට වතුර ඕනේ',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_003',
      name: 'Wrong tense formation',
      input: 'mama heta school giya',
      expected: 'මම හෙට පාසල් යන්නම්',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_004',
      name: 'Numbers inside words',
      input: 'mama 2gedhara yannava',
      expected: 'මම ගෙදර යන්නවා',
      category: 'Typographical error handling',
      grammar: 'Simple sentenc',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_005',
      name: 'Double language mix',
      input: 'mama bus ekata naginna try karanava',
      expected: 'මම bus එකට නැගින්න උත්සාහ කරනවා',
      category: 'Mixed Singlish + English',
      grammar: 'Complex sentence',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_006',
      name: 'Excessive slang',
      input: 'mata wtr ekk dapan bn',
      expected: 'මට වතුර එකක් දාපන් බන්',
      category: 'Slang / informal language',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_007',
      name: 'Wrong plural marker',
      input: 'apita sindu kiyanna puluwan',
      expected: 'අපට සිංදු කියන්න පුළුවන්',
      category: 'Daily language usage',
      grammar: 'Plural form',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_008',
      name: 'URL inside sentence',
      input: 'mama gedhara yanna https://test.com passe ennam',
      expected: 'මම ගෙදර යන්න, පස්සේ එන්නම්',
      category: 'Formatting (spaces / line breaks',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_009',
      name: 'Broken interrogative',
      input: 'oyage nama mok',
      expected: 'ඔයාගේ නම මොකක්ද?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0010',
      name: 'Reversed clause order',
      input: 'ennam passe mama call karanava',
      expected: 'මම පස්සේ කෝල් කරන්නම්',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'M'
    }
    

  ],

  ui: {
    tcId: 'Pos_UI_001',
    name: 'English words remain stable during typing',
    input: 'mama WhatsApp message ekak yawanava',
    partialInput: 'mama WhatsApp mes',
    expectedFull: 'මම WhatsApp message එකක් යවනවා',
    category: 'Mixed language handling',
    grammar: 'Present tense',
    length: 'M'
  }
};


// ================= PAGE OBJECT MODEL =================
class TranslatorPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToSite(): Promise<void> {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField(): Promise<Locator> {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField(): Promise<Locator> {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait(): Promise<void> {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text: string): Promise<void> {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput(): Promise<void> {
    await this.page.waitForFunction(() => {
      const elements = Array.from(
        document.querySelectorAll(
          '.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
        )
      );

      const output = elements.find(el => {
        const isInputField =
          el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
        return !isInputField && el.textContent && el.textContent.trim().length > 0;
      });

      return output !== undefined;
    }, { timeout: 10000 });

    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText(): Promise<string> {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text?.trim() || '';
  }

  async performTranslation(inputText: string): Promise<string> {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}


// ================= TEST SUITE =================
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator: TranslatorPage;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();

      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      await page.waitForTimeout(1500);

      let outputText = await output.textContent();
      expect((outputText ?? '').trim().length).toBeGreaterThan(0);

      await input.pressSequentially(
        TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length),
        { delay: 150 }
      );

      await translator.waitForOutput();

      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);

      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
