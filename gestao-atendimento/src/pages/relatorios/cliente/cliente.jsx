import pdfMaker from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
function clientePDF(clientes){
    pdfMaker.vfs = pdfFonts.pdfMake.vfs;

    const relatorioTitulo = [
        {
            text: 'Clientes',
            fontSize: 15,
            bold: true,
            alignment: 'center',
            margin: [15, 20, 0, 45]
        }
    ];

    const dados = clientes.map((cliente)=>{
        return [
            {text: cliente.idcliente, alignment:'center', fontSize: 9, margin: [0, 2, 0, 2]},
            {text: cliente.nome, alignment:'center', fontSize: 9, margin: [0, 2, 0, 2]},
            {text: cliente.email, alignment:'center', fontSize: 9, margin: [0, 2, 0, 2]},
            {text: cliente.telefone, alignment:'center', fontSize: 9, margin: [0, 2, 0, 2]},
        ]
    });

    const detalhes = [{
        table:{
            headerRows: 1,
            widths:['*', '*', '*', '*'],
            body: [
                [
                    {text:'ID', style:'tableHeader', alignment:'center', fontSize: 10},
                    {text:'Nome', style:'tableHeader', alignment:'center', fontSize: 10},
                    {text:'E-mail', style:'tableHeader', alignment:'center', fontSize: 10},
                    {text:'Telefone', style:'tableHeader', alignment:'center', fontSize: 10},
                ],
                ...dados
                
            ],
        },
        layout: 'lightHorizontalLines'
    }];

    function Rodape(currentPage, pageCount){
        return[{
            text: currentPage + ' de ' + pageCount, 
            fontSize: 9,
            alignment: 'center',
            margin: [0, 10, 20, 0]
        }]
    }

    const docDefinicoes = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [relatorioTitulo],
        content: [detalhes],
        footer: Rodape
    };

    pdfMaker.createPdf(docDefinicoes).open();
}
export default clientePDF;