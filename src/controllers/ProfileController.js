const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {
    return res.render('profile', { profile: await Profile.get() })
  },

  async update(req, res) {
    // rec.boby para os dados
    const data = req.body

    // definir quantas semnana tem o ano: 52
    const weeksPerYear = 52

    // remover as semanas de férias do ano, para pegar quantas semnas tem em 1 mês
    const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12

    // quantas horas por semana estou trabalhando
    const weeksTotalHours = data['hours-per-day'] * data['days-per-week']

    // total de horas trabalhada no mês
    const monthlyTotalHours = weeksTotalHours * weeksPerMonth

    //Qual será o valor da horas
    const valueHours = data['monthly-budget'] / monthlyTotalHours

    const profile = await Profile.get()

      
    await Profile.update({
      ...profile,
      ...req.body,
      'value-hours': valueHours
    })

   

    return res.redirect('/profile')
  }
}
