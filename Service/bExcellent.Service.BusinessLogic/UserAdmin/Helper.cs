using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using bExcellent.Service.Util.Domain;

namespace bExcellent.Service.BusinessLogic.UserAdmin
{
    public static class Helper
    {
        private static IList<Country> _countries;
        private static IList<Zone> _zones;

        /// <summary>
        /// Gets the countries.
        /// </summary>
        public static IList<Country> Countries
        {
            get
            {
                if (_countries == null)
                    _countries = GetCountries();
                return _countries;
            }
        }

        /// <summary>
        /// Gets the countries.
        /// </summary>
        /// <returns></returns>
        private static IList<Country> GetCountries()
        {
            var dataaccess = new UserAdminDataAccess();
            return dataaccess.GetCountries();
        }

        /// <summary>
        /// Gets the zones.
        /// </summary>
        public static IList<Zone> Zones
        {
            get
            {
                if (_zones == null)
                    _zones = GetZones();
                return _zones;
            }
        }

        /// <summary>
        /// Gets the zones.
        /// </summary>
        /// <returns></returns>
        private static IList<Zone> GetZones()
        {
            var dataaccess = new UserAdminDataAccess();
            return dataaccess.GetZones();
        }

        /// <summary>
        /// Gets the area by id.
        /// </summary>
        /// <param name="AreaId">The area id.</param>
        /// <returns></returns>
        public static IList<Zone> GetZoneByCountryId(int countryId)
        {
            var zone = Zones.Where(b => b.CountryId == countryId);
            return zone.ToList();
        }

        /// <summary>
        /// Gets the area by id.
        /// </summary>
        /// <param name="AreaId">The area id.</param>
        /// <returns></returns>
        public static string GetAreaById(int AreaId)
        {
            var zone = Zones.FirstOrDefault(b => b.Id == AreaId);
            if (zone != null)
            {
                return zone.Name;
            }
            return string.Empty;
        }

        /// <summary>
        /// Gets the name of the country.
        /// </summary>
        /// <param name="countryId">The country id.</param>
        /// <returns></returns>
        public static string GetCountryName(int countryId)
        {
            var country = Countries.FirstOrDefault(b => b.Id == countryId);
            if (country != null)
            {
                return country.Name;
            }
            return string.Empty;
        }
    }
}