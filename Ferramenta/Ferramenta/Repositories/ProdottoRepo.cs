using Ferramenta.Models;

namespace Ferramenta.Repositories
{
    public class ProdottoRepo : IRepo<Prodotto>
    {
        #region singleton
        private static ProdottoRepo? _instance;

        public static ProdottoRepo getInstance()
        {
            if (_instance == null)
                _instance = new ProdottoRepo();
            return _instance;
        }

        private ProdottoRepo() { }
        #endregion
        public bool Delete(int id)
        {
            bool risultato = false;
            using (AccFerramentaContext ctx = new AccFerramentaContext())
            {
                try
                {
                    Prodotto p = ctx.Prodottos.Single(c => c.ProdottoId == id);
                    ctx.Prodottos.Remove(p);
                    ctx.SaveChanges();

                    risultato = true;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            return risultato;
        }

        public List<Prodotto> FilteredList(string cat)
        {
            List<Prodotto> elenco = new List<Prodotto>();

            using (AccFerramentaContext ctx = new AccFerramentaContext())
            {
                elenco = ctx.Prodottos.Where(p=>p.Categoria== "cat").ToList();
            }

            return elenco;
        }

        public List<Prodotto> GetAll()
        {
            List<Prodotto> elenco = new List<Prodotto>();

            using (AccFerramentaContext ctx = new AccFerramentaContext())
            {
                elenco = ctx.Prodottos.ToList();
            }

            return elenco;
        }

        public Prodotto? GetById(int id)
        {
            Prodotto? p = null;

            using (AccFerramentaContext ctx = new AccFerramentaContext())
                p = ctx.Prodottos.FirstOrDefault(pr => pr.ProdottoId == id);

            return p;
        }

        public bool Insert(Prodotto t)
        {
            bool risultato = false;
            using (AccFerramentaContext ctx = new AccFerramentaContext())
            {
                try
                {
                    ctx.Prodottos.Add(t);
                    ctx.SaveChanges();

                    risultato = true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            return risultato;
        }

        public bool Update(Prodotto t)
        {
            bool risultato = false;

            using (AccFerramentaContext ctx = new AccFerramentaContext())
            {
                try
                {
                    Prodotto temp = ctx.Prodottos.Single(p => p.Codice == t.Codice);

                    t.ProdottoId = temp.ProdottoId;
                    t.Codice = temp.Codice;
                    t.Nome = t.Nome is not null ? t.Nome : temp.Nome;
                    t.Categoria = t.Categoria is not null ? t.Categoria : temp.Categoria;
                    t.Descrizione = t.Descrizione is not null ? t.Descrizione : temp.Descrizione;
                    t.Prezzo = t.Prezzo == 0 ? temp.Prezzo : t.Prezzo;
                    t.Quantita = temp.Quantita;

                    ctx.Entry(temp).CurrentValues.SetValues(t);

                    ctx.SaveChanges();

                    risultato = true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            return risultato;
        }

        bool IRepo<Prodotto>.UpdateQt(Prodotto t)
        {
            bool risultato = false;

            using (AccFerramentaContext ctx = new AccFerramentaContext())
            {
                try
                {
                    Prodotto temp = ctx.Prodottos.Single(p => p.Codice == t.Codice);

                    t.ProdottoId = temp.ProdottoId;
                    t.Codice = temp.Codice;
                    t.Nome = temp.Nome;
                    t.Categoria = temp.Categoria;
                    t.Descrizione = temp.Descrizione;
                    t.Prezzo = temp.Prezzo;

                    ctx.Entry(temp).CurrentValues.SetValues(t);

                    ctx.SaveChanges();

                    risultato = true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            return risultato;
        }
        public Prodotto? GetByCodice(string codice)
        {
            Prodotto? p = null;

            using (AccFerramentaContext ctx = new AccFerramentaContext())
                p = ctx.Prodottos.FirstOrDefault(p => p.Codice == codice);

            return p;
        }
    }
}
