import Clientes from './Intranet/views/modules/Clientes';
import Eans from './Intranet/views/modules/Eans';
import Articulos from './Intranet/views/modules/Articulos';
import Graficos from './Intranet/views/modules/Graficos';
import Email from './Intranet/views/modules/Email';
import CustomModule from './Intranet/views/modules/CustomModule';
import Combinaciones from './Intranet/views/modules/Combinaciones';
import ImportArticulos from './Intranet/views/modules/ImportArticulos';

 export const modules = [
{
 path: 'clientes' ,
element: <Clientes />,
},
{
 path: 'articulos/eans' ,
element: <Eans />,
},
{
 path: 'articulos' ,
element: <Articulos />,
},
{
 path: 'graficos' ,
element: <Graficos />,
},
{
 path: 'email' ,
element: <Email />,
},
{
 path: 'customModule' ,
element: <CustomModule />,
},
{
 path: 'combinaciones' ,
element: <Combinaciones />,
},
{
 path: 'importar-articulos' ,
element: <ImportArticulos />,
},
];
