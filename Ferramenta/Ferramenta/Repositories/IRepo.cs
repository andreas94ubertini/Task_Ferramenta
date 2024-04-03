namespace Ferramenta.Repositories
{
    public interface IRepo<T>
    {
        T? GetById(int id);
        List<T> GetAll();
        bool Insert(T t);
        bool Update(T t);
        bool Delete(int id);
        List<T> FilteredList(string cat);
        bool UpdateQt(T t);
    }
}
