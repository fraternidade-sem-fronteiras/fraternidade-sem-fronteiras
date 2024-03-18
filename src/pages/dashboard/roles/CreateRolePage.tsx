import axios from '@/utils/axios.instance'
import { toCamelCase } from '@/utils/utils'
import vineResolver from '@/utils/vine.resolver'
import {
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'
import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const formSchema = vine.object({
  name: vine.string().minLength(3).maxLength(64),
  permissions: vine.array(vine.string().trim().escape().minLength(3).maxLength(32)).maxLength(100),
})

type FormProps = Infer<typeof formSchema>

export default function CreateRolePage() {
  const [permissions, setPermissions] = useState<string[]>([])
  const {
    setValue,
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: vineResolver(formSchema),
    defaultValues: {
      permissions: [],
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/permissions').then(({ data }) => {
      setPermissions(data)
    })
  }, [])

  const categories = permissions
    .reduce((acc, permission) => {
      const split = permission.split('_')

      if (split.length > 1) {
        const category = split[split.length - 1]

        if (!acc.includes(category)) {
          acc.push(category)
        }
      }

      return acc
    }, [] as string[])
    .map((category) => ({
      name: category,
      permissions: permissions.filter((permission) => permission.endsWith(category)),
    }))
  const rest = permissions.filter(
    (permission) => !categories.some((category) => category.permissions.includes(permission))
  )

  const onSubmit = (data: FormProps) => {
    axios
      .post('/roles', {
        ...data,
        permissions: data.permissions.includes('ALL') ? ['ALL'] : data.permissions,
      })
      .then(() => {
        navigate('../')
      })
  }

  const currentPermissions = watch('permissions')

  const handleChangePermission = (permission: string) => {
    if (permission === 'ALL') {
      if (currentPermissions.includes('ALL')) {
        setValue(
          'permissions',
          currentPermissions.filter((p) => p !== 'ALL')
        )
        return
      }

      setValue('permissions', permissions)
      return
    }

    if (currentPermissions.includes('ALL')) {
      setValue('permissions', [])
    }

    setValue(
      'permissions',
      currentPermissions.includes(permission)
        ? currentPermissions.filter((p) => p !== permission)
        : [...currentPermissions, permission]
    )
  }

  const handleChangeCategory = (category: string) => {
    if (currentPermissions.includes('ALL')) {
      setValue('permissions', [])
    }

    if (isCategoryChecked(category)) {
      setValue(
        'permissions',
        currentPermissions.filter((permission) => !permission.endsWith(category))
      )
      return
    }

    setValue('permissions', [
      ...new Set([
        ...(categories.find((c) => c.name === category)?.permissions ?? []),
        ...currentPermissions,
      ]),
    ])
  }

  const isCategoryChecked = (category: string): boolean => {
    if (currentPermissions.includes('ALL') && currentPermissions.length === permissions.length)
      return true

    return (
      categories
        .find((c) => c.name === category)
        ?.permissions.every((permission) => currentPermissions.includes(permission)) ?? false
    )
  }

  const isCategoryIndeterminate = (category: string): boolean => {
    return (
      categories
        .find((c) => c.name === category)
        ?.permissions.some((permission) => currentPermissions.includes(permission)) ?? false
    )
  }

  return (
    <Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nome do cargo</FormLabel>
          <Input {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.permissions}>
          <FormLabel>Permissões</FormLabel>
          <CheckboxGroup value={currentPermissions}>
            {categories.map((category) => (
              <div key={category.name}>
                <FormLabel>Permissões de {toCamelCase(category.name)}</FormLabel>
                <Checkbox
                  isChecked={isCategoryChecked(category.name)}
                  isIndeterminate={
                    !isCategoryChecked(category.name) && isCategoryIndeterminate(category.name)
                  }
                  onChange={() => handleChangeCategory(category.name)}
                >
                  <Stack pl={6} mt={1} spacing={1}>
                    {category.permissions.map((permission) => (
                      <Checkbox
                        key={permission}
                        value={permission}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleChangePermission(event.target.value)
                        }
                      >
                        {permission}
                      </Checkbox>
                    ))}
                  </Stack>
                </Checkbox>
              </div>
            ))}
            <FormLabel>Outras permissões</FormLabel>
            {rest.map((permission) => (
              <Checkbox
                key={permission}
                value={permission}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChangePermission(event.target.value)
                }
              >
                {permission}
              </Checkbox>
            ))}
            <FormLabel>Criar permissão</FormLabel>
          </CheckboxGroup>
          <FormErrorMessage>{errors.permissions?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit">Criar cargo</Button>
      </form>
    </Center>
  )
}
