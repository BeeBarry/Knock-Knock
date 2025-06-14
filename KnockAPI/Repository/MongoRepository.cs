//using MongoDB.Driver;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace KnockAPI.Repository
//{
//    public class MongoRepository
//    {
//        private readonly IMongoDatabase _database;
//        public MongoRepository(string connectionString, string databaseName)
//        {
//            var client = new MongoClient(connectionString);
//            _database = client.GetDatabase(databaseName);
//        }
        
//        public async Task<T?> AddAsync<T>(string collectionName, T item)
//        {
//            try
//            {
//                var collection = _database.GetCollection<T>(collectionName);
//                await collection.InsertOneAsync(item);
//                return item;
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine($"Error adding item to Cosmos DB: {ex.Message}");
//                return default;
//            }
//        }

//        public async Task<IEnumerable<T>> GetAllAsync<T>(string collectionName)

//        {
//            var collection = _database.GetCollection<T>(collectionName);
//            return await collection.Find(Builders<T>.Filter.Empty).ToListAsync();
//        }

//        public async Task<T?> GetByIdAsync<T>(string collectionName, int id)
//        {
//            var collection = _database.GetCollection<T>(collectionName);
//            var filter = Builders<T>.Filter.Eq("pokemonId", id);
//            return await collection.Find(filter).FirstOrDefaultAsync();
//        }

       
//    }
//}
