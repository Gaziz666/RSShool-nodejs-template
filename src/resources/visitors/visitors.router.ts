import router, { Response } from 'express';
import { IRequest } from '../../@types/module';
import xmlrpc from 'xmlrpc';
import { errorLogger } from '../../errorhandler/errHandler';
import { parse, validate, getTraversalObj } from 'fast-xml-parser';
import he from 'he';

const options = {
  attributeNamePrefix: '@_',
  attrNodeName: 'attr', //default is 'false'
  textNodeName: '#text',
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: '__cdata', //default is 'false'
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: false,
  numParseOptions: {
    hex: true,
    leadingZeros: true,
    //skipLike: /\+[0-9]{10}/
  },
  arrayMode: false, //"strict"
  attrValueProcessor: (val: string, _attrName: string) =>
    he.decode(val, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: (val: string, _attrName: string) => he.decode(val), //default is a=>a
  stopNodes: ['parse-me-as-string'],
  alwaysCreateTextNode: false,
};

const server = xmlrpc.createServer({ host: 'localhost', port: 9090 });
// const returnValue =
`<?xml version="1.0"?>
<methodResponse>
    <params>
        <param>
            <value><i4>1</i4></value>
        </param>
    </params>
</methodResponse>`;
const ansverXML = `<?xml version="1.0"?>
<methodResponse>
   <params>
      <param>
        <value>
           <array>
              <data>
                 <value>
                    <struct>
                       <member>
                         <name>ScheduledAction</name>
                          <value>DoorTimedUnlock</value> 
                       </member>
                       <member>
                         <name>ItemName</name>
                         <value>Front Lobby Door</value>
                       </member>
                       <member>
                         <name>ItemGuid</name>
                         <value>{8AFBC4D6-9185-43BD-
                                  9434-3C655E0A8D17}</value>
                       </member>
                       <member>
                         <name>ScheduledID</name>
                         <value>915</value>
                       </member>
                       <member>
                        <name>ScheduledTime</name> 
                        <value><dateTime.iso8601>01050911T09:43:00
                        </dateTime.iso8601></value>

                        </member>
                        <member>
                                <name>ScheduledParam</name>
                                <value><i4>60</i4></value>
                              </member>
                          </struct>
                        </value>
                        <value>
                          <struct>
                        <member> <name>ScheduledAction</name> <value>DoorTimedUnlock</value>
                              </member>
                              <member>
                        <name>ItemName</name> <value>Engineering Lab Door</value>
                        </member>
                        <member>
                        <name>ItemGuid</name> <value>{ABE254EB-38CA-4C06-8E2A-F6C6A21E64B3}</value>
                        </member>

                        <member>
                          <name>ScheduledID</name>
                          <value>951</value>
                        </member>
                        <member>
                        <name>ScheduledTime</name> <value><dateTime.iso8601>01050911T10:13:00
                        </dateTime.iso8601></value>

                        </member>
                        <member>
        <name>ScheduledParam</name>
        <value><i4>35</i4></value>
      </member>
   </struct>
</value>
</data>
           </array>
        </value>
      </param>
   </params>
</methodResponse>`;

server.on('NotFound', (method, params) => {
  console.log('Methods' + method + 'does not exist', params);
});

server.on('anAction', (err, params, callback) => {
  if (err) {
    console.log('err', errorLogger);
  }
  console.log('Methods call params for anAction: ', params);
  callback(null, ansverXML);
});
console.log('XML-RPC server listening on port 9091');
const Router = router.Router();
Router.route('/test').get(async (_req: IRequest, res: Response) => {
  const client = xmlrpc.createClient({
    host: 'localhost',
    port: 9090,
    path: '/',
  });
  const result: string = await new Promise((resolve, reject) => {
    client.methodCall('anAction', ['aParams'], (error, value) => {
      if (error) {
        console.log('error', error);
        reject(error);
      }
      console.log('method response for anAction: value:');
      resolve(value);
    });
  });
  let jsonObj = '';
  let tObj: { [key: string]: any } = {};

  if (validate(result) === true) {
    jsonObj = parse(result, options);
    tObj = getTraversalObj(result, options);
    console.log('jsonObj', jsonObj, tObj['child']);
  } else {
    console.log('not valid', result);
  }
  res.json(jsonObj);
});

export { Router as visitorRouter };
