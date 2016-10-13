  export default {
  admin: {
    can:['server:delete'],
    inherits: ['manager']
  },
  manager: {
    can:['server:update'],
    inherits: ['user']
  },
  user: {
    can: [
      'server:create',
      'server:read',
      {name: 'message:edit', when:params => params.message.userId === params.user.id},
      {name: 'message:delete', when:params => params.message.userId === params.user.id}
    ]
  },
  banned: {
    can: []
  }
};
