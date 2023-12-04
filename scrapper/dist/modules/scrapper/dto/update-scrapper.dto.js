"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScrapperDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_scrapper_dto_1 = require("./create-scrapper.dto");
class UpdateScrapperDto extends (0, mapped_types_1.PartialType)(create_scrapper_dto_1.CreateScrapperDto) {
}
exports.UpdateScrapperDto = UpdateScrapperDto;
//# sourceMappingURL=update-scrapper.dto.js.map