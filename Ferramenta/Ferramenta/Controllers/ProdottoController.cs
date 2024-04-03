using Ferramenta.Models;
using Ferramenta.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Ferramenta.Controllers
{
    [ApiController]
    [Route("api/prodotti")]
    public class ProdottoController : Controller
    {
        [HttpGet]
        public IActionResult ElencoProdotti()       
        {
            return Ok(ProdottoRepo.getInstance().GetAll());
        }

        [HttpGet("{codice}")]
        public IActionResult DettaglioProdotto(string codice)
        {
            Prodotto? p = ProdottoRepo.getInstance().GetByCodice(codice);
            if (p is not null)
                return Ok(p);

            return NotFound();
        }

        [HttpPost]
        public IActionResult Inserisciprodotto(Prodotto objPro)
        {
            if (ProdottoRepo.getInstance().Insert(objPro))
                return Ok();

            return BadRequest();
        }

        private IActionResult EliminaProd(int varId)
        {
            if (ProdottoRepo.getInstance().Delete(varId))
                return Ok();

            return BadRequest();
        }

        [HttpDelete("codice/{varCodice}"), HttpPost("codice/{varCodice}")]
        public IActionResult EliminaPerCodiceProd(string varCodice)
        {
            Prodotto? p = ProdottoRepo.getInstance().GetByCodice(varCodice);
            if (p is null)
                return BadRequest();

            return EliminaProd(p.ProdottoId);
        }

        [HttpPut]
        public IActionResult ModificaProdotto(Prodotto objPrd)
        {
            if (ProdottoRepo.getInstance().Update(objPrd))
                return Ok();

            return BadRequest();
        }
    }
}
