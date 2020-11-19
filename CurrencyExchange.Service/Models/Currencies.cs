﻿using System;

namespace CurrencyExchange.Service.Models
{
    internal class Currencies
    {
        public bool Success { get; set; }

        public int Timestamp { get; set; }

        public string Base { get; set; }

        public DateTime Date { get; set; }

        public Rates Rates { get; set; }
    }
}
