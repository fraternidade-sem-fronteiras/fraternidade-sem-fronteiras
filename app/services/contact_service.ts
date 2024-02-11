import Contact from '#models/contact'

export default class ContactService {
  /**
   * Registra um novo contato a um assistido
   *
   * @param assistedId
   * @param name
   * @param kinship
   * @param phone
   * @param email
   * @param other
   * @returns
   */
  async createContact(
    assistedId: number,
    name: string,
    kinship: string,
    phone: string | null,
    email: string | null,
    other: string | null
  ): Promise<Contact> {
    let contact = new Contact()

    contact.assistedId = assistedId
    contact.name = name
    contact.kinship = kinship
    contact.phone = phone
    contact.email = email
    contact.other = other

    await contact.save()

    return contact
  }

  /**
   * Retorna o contato pelo seu id
   * @param id
   * @returns
   */
  async getContactById(id: number): Promise<Contact | null> {
    return await Contact.findBy('id', id)
  }

  /**
   * Retorna os contatos do assistido especificado pelo assistedId
   * @param assistedId
   * @returns
   */
  async getContactsByAssistedId(assistedId: number): Promise<Contact[]> {
    return await Contact.query().where('assistedId', assistedId)
  }

  /**
   * Atualiza informações do contato
   * @param id
   * @param payload
   */
  async updateContact(id: number, payload: any): Promise<any> {
    const contact = await Contact.findBy('id', id)

    if (!contact) {
      throw new Error('Contato não encontrado')
    }

    const oldContact = {
      name: contact?.name,
      kinship: contact?.kinship,
      phone: contact?.phone,
      email: contact?.email,
      other: contact?.other,
    }

    await contact
      .merge({
        name: payload.name,
        kinship: payload.kinship,
        phone: payload.phone,
        email: payload.email,
        other: payload.other,
      })
      .save()

    return {
      id: contact.id,
      updated: [
        {
          fieldName: 'name',
          oldValue: oldContact.name,
          newValue: contact.name,
        },
        {
          fieldName: 'kinship',
          oldValue: oldContact.kinship,
          newValue: contact.kinship,
        },
        {
          fieldName: 'phone',
          oldValue: oldContact.phone,
          newValue: contact.phone,
        },
        {
          fieldName: 'email',
          oldValue: oldContact.email,
          newValue: contact.email,
        },
        {
          fieldName: 'other',
          oldValue: oldContact.other,
          newValue: contact.other,
        },
      ],
    }
  }

  /**
   * Deleta um contato pelo seu id
   * @param id
   */
  async deleteContact(id: number) {
    let contact = await Contact.findBy('id', id)

    if (!contact) {
      throw new Error('Contato não encontrado')
    }

    await contact.delete()
  }
}
