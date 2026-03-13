import { Module } from '@nestjs/common';
import { REQUEST_TYPE_ELIGIBILITY_RULE_REPOSITORY } from '../../application/ports/injection-tokens';
import { CreateRequestTypeEligibilityRuleUseCase } from '../../application/use-cases/CreateRequestTypeEligibilityRule/CreateRequestTypeEligibilityRuleUseCase';
import { DeleteRequestTypeEligibilityRuleUseCase } from '../../application/use-cases/DeleteRequestTypeEligibilityRule/DeleteRequestTypeEligibilityRuleUseCase';
import { GetRequestTypeEligibilityRuleByIdUseCase } from '../../application/use-cases/GetRequestTypeEligibilityRuleById/GetRequestTypeEligibilityRuleByIdUseCase';
import { ListRequestTypeEligibilityRulesUseCase } from '../../application/use-cases/ListRequestTypeEligibilityRules/ListRequestTypeEligibilityRulesUseCase';
import { UpdateRequestTypeEligibilityRuleUseCase } from '../../application/use-cases/UpdateRequestTypeEligibilityRule/UpdateRequestTypeEligibilityRuleUseCase';
import { PrismaRequestTypeEligibilityRuleRepository } from '../../infrastructure/database/repositories/prisma-request-type-eligibility-rule.repository';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';
import { RequestTypeEligibilityRulesController } from '../controller/request-type-eligibility-rules.controller';

@Module({
  controllers: [RequestTypeEligibilityRulesController],
  providers: [
    PrismaService,
    {
      provide: REQUEST_TYPE_ELIGIBILITY_RULE_REPOSITORY,
      useClass: PrismaRequestTypeEligibilityRuleRepository,
    },
    {
      provide: ListRequestTypeEligibilityRulesUseCase,
      useFactory: (repo) => new ListRequestTypeEligibilityRulesUseCase(repo),
      inject: [REQUEST_TYPE_ELIGIBILITY_RULE_REPOSITORY],
    },
    {
      provide: GetRequestTypeEligibilityRuleByIdUseCase,
      useFactory: (repo) => new GetRequestTypeEligibilityRuleByIdUseCase(repo),
      inject: [REQUEST_TYPE_ELIGIBILITY_RULE_REPOSITORY],
    },
    {
      provide: CreateRequestTypeEligibilityRuleUseCase,
      useFactory: (repo) => new CreateRequestTypeEligibilityRuleUseCase(repo),
      inject: [REQUEST_TYPE_ELIGIBILITY_RULE_REPOSITORY],
    },
    {
      provide: UpdateRequestTypeEligibilityRuleUseCase,
      useFactory: (repo) => new UpdateRequestTypeEligibilityRuleUseCase(repo),
      inject: [REQUEST_TYPE_ELIGIBILITY_RULE_REPOSITORY],
    },
    {
      provide: DeleteRequestTypeEligibilityRuleUseCase,
      useFactory: (repo) => new DeleteRequestTypeEligibilityRuleUseCase(repo),
      inject: [REQUEST_TYPE_ELIGIBILITY_RULE_REPOSITORY],
    },
  ],
  exports: [
    ListRequestTypeEligibilityRulesUseCase,
    GetRequestTypeEligibilityRuleByIdUseCase,
    CreateRequestTypeEligibilityRuleUseCase,
    UpdateRequestTypeEligibilityRuleUseCase,
    DeleteRequestTypeEligibilityRuleUseCase,
  ],
})
export class RequestTypeEligibilityRulesModule {}
