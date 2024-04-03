using System;
using System.Collections.Generic;

namespace Ferramenta.Models;

public partial class Prodotto
{
    public int ProdottoId { get; set; }

    public string Codice { get; set; } = Guid.NewGuid().ToString();

    public string Nome { get; set; } = null!;

    public decimal Prezzo { get; set; }

    public string? Descrizione { get; set; }

    public int Quantita { get; set; }

    public string Categoria { get; set; } = null!;

    public DateOnly DataCreazione { get; set; }
}
