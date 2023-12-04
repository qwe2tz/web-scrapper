"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatModule = void 0;
const common_1 = require("@nestjs/common");
const flat_service_1 = require("./flat.service");
const flat_controller_1 = require("./flat.controller");
const typeorm_1 = require("@nestjs/typeorm");
const flat_entity_1 = require("./entities/flat.entity");
let FlatModule = class FlatModule {
};
exports.FlatModule = FlatModule;
exports.FlatModule = FlatModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([flat_entity_1.Flat])],
        controllers: [flat_controller_1.FlatController],
        providers: [flat_service_1.FlatService],
        exports: [flat_service_1.FlatService, typeorm_1.TypeOrmModule.forFeature([flat_entity_1.Flat])],
    })
], FlatModule);
//# sourceMappingURL=flat.module.js.map