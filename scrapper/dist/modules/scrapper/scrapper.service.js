"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapperService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const puppeteer_1 = require("puppeteer");
let ScrapperService = class ScrapperService {
    async scrapeFlats() {
        const browser = await puppeteer_1.default.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1024, height: 768 });
        try {
            await page.goto('https://www.sreality.cz/en/search/for-sale/apartments');
            const flats = await page.$$('.property');
            for (let i = 0; i < flats.length; i++) {
                const parsedFlat = await (await flats[i].getProperty('innerText')).jsonValue();
                console.log('Parse flat: ', parsedFlat[1]);
            }
        }
        catch (error) {
            console.error('Error while scraping job listings:', error);
        }
        finally {
            await browser.close();
        }
    }
};
exports.ScrapperService = ScrapperService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScrapperService.prototype, "scrapeFlats", null);
exports.ScrapperService = ScrapperService = __decorate([
    (0, common_1.Injectable)()
], ScrapperService);
//# sourceMappingURL=scrapper.service.js.map