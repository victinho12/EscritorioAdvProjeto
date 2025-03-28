import { AdvogadoView } from "./view/AdvogadoView";
import { ClienteView } from "./view/ClienteView";
import { PagamentosView } from "./view/PagamentosView";
import { ConsultasView } from "./view/ConsultasView";


// const clienteview = new ClienteView
// clienteview.exibirMenu();


// const advogadoView = new AdvogadoView
// advogadoView.exibirMenu();


const consultasView = new ConsultasView
consultasView.exibirMenu()

// const pagamentosView = new PagamentosView
// pagamentosView.exibirMenu()


//select consultas.id,cpf_clientes, advogados.id ,nome, email, situacao, id_advogado from public.consultas
//join public.advogados on consultas.id_advogado = advogados.id 
