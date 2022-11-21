import pdfMaker from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
function produtoPDF(produtos){
    pdfMaker.vfs = pdfFonts.pdfMake.vfs;

    const relatorioTitulo = [
        {
            text: 'Produtos',
            fontSize: 15,
            bold: true,
            alignment: 'center',
            margin: [15, 20, 0, 45]
        }
    ];

    const dados = produtos.map((produto)=>{
        return [
            {text: produto.idproduto, alignment:'center', fontSize: 9, margin: [0, 2, 0, 2]},
            {text: produto.descricao, alignment:'center', fontSize: 9, margin: [0, 2, 0, 2]},
            {text: produto.quantidade, alignment:'center', fontSize: 9, margin: [0, 2, 0, 2]},
            {text: 'R$'+produto.valorcompra, alignment:'center', fontSize: 9, margin: [0, 2, 0, 2]},
            {text: 'R$'+produto.valorvenda, alignment:'center', fontSize: 9, margin: [0, 2, 0, 2]},
            {text: produto.categoria, alignment:'center', fontSize: 9, margin: [0, 2, 0, 2]},
        ]
    });

    const detalhes = [{
        table:{
            headerRows: 1,
            widths:['*', '*', '*', '*', '*', '*'],
            body: [
                [
                    {text:'ID', style:'tableHeader', alignment:'center', fontSize: 10},
                    {text:'Descrição', style:'tableHeader', alignment:'center', fontSize: 10},
                    {text:'Quantidade', style:'tableHeader', alignment:'center', fontSize: 10},
                    {text:'Valor de Compra', style:'tableHeader', alignment:'center', fontSize: 10},
                    {text:'Valor de Venda', style:'tableHeader', alignment:'center', fontSize: 10},
                    {text:'Categoria', style:'tableHeader', alignment:'center', fontSize: 10},
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
export default produtoPDF;