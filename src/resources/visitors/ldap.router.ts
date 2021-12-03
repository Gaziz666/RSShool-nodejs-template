import router, { Response } from 'express';
import { IRequest } from '../../@types/module';
// import ldap, { SearchRequest, Client } from 'ldapjs';
import { Client } from 'ldapts';

// const server = ldap.createServer();

// server.search('dc=example', (req: SearchRequest, res: Response) => {
//   const obj = {
//     dn: req.dn.toString(),
//     attributes: {
//       objectclass: ['organization', 'top'],
//       o: 'example',
//     },
//   };

//   if (req.filter.matches(obj.attributes)) res.send(obj);
//   res.end();
// });

// server.listen(1389, () => {
//   console.log('ldapjs listening at ', server.url);
// });

const Router = router.Router();
Router.route('/test').get(async (_req: IRequest, res: Response) => {
  const client = new Client({
    url: 'ldap://ldap.forumsys.com:389',
    // timeout: 0,
    // connectTimeout: 0,
    // tlsOptions: {
    //   minVersion: 'TLSv1.2',
    // },
    // strictDN: true,
  });

  const bindDN = 'cn=read-only-admin,dc=example,dc=com';
  const password = 'password';
  const searchDN = 'ou=scientists,dc=example,dc=com';
  let isAuthentificated = false;
  try {
    await client.bind(bindDN, password);
    isAuthentificated = true;
    const { searchEntries, searchReferences } = await client.search(searchDN, {
      filter: '(uid=tesla)',
      scope: 'sub',
    });
    console.log(searchEntries, searchReferences);
  } catch (err) {
    console.log(err);
    isAuthentificated = false;
    throw err;
  } finally {
    await client.unbind();
  }

  res.send(isAuthentificated);
});

export { Router as ldapRouter };
