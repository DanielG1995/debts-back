import { Resolver, Query, Mutation, Args, Int, ResolveField, Float, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { DebtsService } from 'src/debts/debts.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly debtsService: DebtsService
  ) { }



  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @ResolveField(() => Float)
  async getTotalDebt(@Parent() user: User): Promise<number> {
    return this.debtsService.getTotalDebtByUser(user)
  }

  @ResolveField(() => Float)
  async getTotalPending(@Parent() user: User): Promise<number> {
    return this.debtsService.getTotalPendingByUser(user)
  }
}
