using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System;

namespace CurrencyExchange.Service.Models
{
    [BsonIgnoreExtraElements]
    public class Currencies
    {
        [BsonId(IdGenerator = typeof(ObjectIdGenerator))]
        public ObjectId? ObjectId;
        
        [BsonElement("Success")]
        public bool Success { get; set; }

        [BsonElement("Timetamp")]
        public int Timestamp { get; set; }

        [BsonElement("Base")]
        public string Base { get; set; }

        [BsonElement("Date")]
        public DateTime Date { get; set; }

        [BsonElement("Rates")]
        public Rates Rates { get; set; }
    }
}
