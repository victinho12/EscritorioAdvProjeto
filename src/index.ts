import chalk, { Chalk } from "chalk";
import { ClienteService } from "./Service/clienteService";
import { AdvogadoService } from "./Service/advogadoService";
import test from "node:test";
const cliente1 = new ClienteService();
const advogado1 = new AdvogadoService();


/*async function verClientes() {
  console.table(await cliente1.listarClientes());
}
async function buscarClientes() {
  console.table(await cliente1.buscarClientesPorCpf("006-134-90") )
}
async function inserirCliente() {
  console.table(await cliente1.inserirCliente("06441443007","Eduardo","2000/05/11","esfaquiar o motoqueiro"))
}
async function verifivarCpf() {
  
}

buscarClientes();
//verClientes();
*/