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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const flat_entity_1 = require("./entities/flat.entity");
let FlatService = class FlatService {
    constructor(flatRepository) {
        this.flatRepository = flatRepository;
    }
    create(createFlat) {
        const flat = new flat_entity_1.Flat();
        flat.title = createFlat.title;
        flat.image_url = createFlat.image_url;
        return this.flatRepository.save(flat);
    }
    findAll() {
        return this.flatRepository.find();
    }
    findOne(title) {
        return this.flatRepository.findOneBy({ title: title });
    }
    remove(id) {
        return this.flatRepository.delete(id);
    }
};
exports.FlatService = FlatService;
exports.FlatService = FlatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(flat_entity_1.Flat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FlatService);
//# sourceMappingURL=flat.service.js.map