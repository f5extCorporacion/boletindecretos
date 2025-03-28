export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'auth',
  errorRoot: 'error',
};

export default {
  dashboard: `/`,
  analytics: `/${rootPaths.pageRoot}/analytics`,
  messages: `/${rootPaths.pageRoot}/messages`,
  notification: `/${rootPaths.pageRoot}/notification`,
  anexos: `/${rootPaths.pageRoot}/anexos`,
  boletines: `/${rootPaths.pageRoot}/boletines`,
  misboletines: `/${rootPaths.pageRoot}/misboletines`,
  gestionboletin: `/${rootPaths.pageRoot}/gestionboletin/:id`,

  signin: `/${rootPaths.authRoot}/signin`,
  signup: `/${rootPaths.authRoot}/signup`,
  resetPassword: `/${rootPaths.authRoot}/reset-password`,
  404: `/${rootPaths.errorRoot}/404`,
};
