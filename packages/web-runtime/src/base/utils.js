export const SCOPED_NAME = Symbol("scoped_name");

export const scope = (name, action) => (context, value) => {
  const { state, actions, effects, ...rest } = context;
  return action(
    {
      state: context.state[name],
      actions: context.actions[name],
      effects: context.effects[name],
      overmind: context,
      ...rest
    },
    value
  );
};

export const getScopeId = context => {
  const { actionName, actionId, operatorId } = context.execution;
  return `${actionName}:${actionId}:${operatorId}`;
};
