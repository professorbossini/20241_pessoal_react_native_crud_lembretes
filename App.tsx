import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import {
  useState
} from 'react'

interface Lembrete{
  id?: string;
  texto: string;
}

export default function App() {
  const [lembrete, setLembrete] = useState<Lembrete>({texto: ''})
  const [lembretes, setLembretes] = useState<Lembrete[]>([])
  const [emModoDeEdicao, setEmModoDeEdicao] = useState(false)
  const adicionar = () => {
    const novoLembrete: Lembrete = {id: Date.now().toString(), texto: lembrete.texto}
    console.log(novoLembrete)
    setLembretes(lembretesAtual => [
        novoLembrete, //primeiro o novo lembrete
        ...lembretesAtual //extrai todos os lembretes já existentes com o operador spread

      ]
    )
    //limpa o campo em que o usuário digita o lembrete
    setLembrete({texto: ''})
  }

  const remover = (lembrete: Lembrete) => {
    //remove sem alert
    setLembretes(lembretesAtual => lembretesAtual.filter(item => item.id !== lembrete.id));
  }

  const atualizar = () => {
    //para cada lembrete, verifica se o id é igual ao id do lembrete em edição
    //se for, retorna o lembrete em edição, senão, retorna o lembrete original
    const lembretesAtualizados = lembretes.map(item => {
      console.log(item, lembrete)
      if(item.id === lembrete.id){
        return lembrete
      }
      return item
    })
    //atualiza a lista de lembretes
    //aplicação em modo de adição
    setEmModoDeEdicao(false)
    //limpa o campo em que o usuário digita o lembrete
    setLembrete({texto: ''})
    console.log(lembretesAtualizados)
    setLembretes(lembretesAtuais => lembretesAtualizados)

  }

  // const remover = (lembrete: Lembrete) => {
  //   console.log('chamou')
  //   Alert.alert(
  //     //título
  //     'Remover Lembrete', 
  //     //mensagem central
  //     `Deseja remover este lembrete? ${lembrete.texto}`, 
  //     //coleção de botões
  //     [
  //       {
  //         text: 'Cancelar',
  //         style: 'cancel'
  //       },
  //       {
  //         text: 'Remover',
  //         style: 'destructive',
  //         onPress: () => {
  //           setLembretes(lembretesAtual => lembretesAtual.filter(item => item.id !== lembrete.id));
  //         }
  //       }
  //     ]
  //   );
  // }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} 
        placeholder='Digite um lembrete...'
        value={lembrete.texto}
        onChangeText={(novoTexto) => setLembrete({id: lembrete.id, texto: novoTexto})}
      />
      <Pressable
        style={styles.button}
        onPress={emModoDeEdicao ? atualizar : adicionar}>
        <Text
          style={styles.buttonText}>
            {
              emModoDeEdicao ? 'Atualizar lembrete' : 'Salvar lembrete'
            }
        </Text>
      </Pressable>
      <FlatList
        style={styles.list}
        //embora possa ser null, usamos o operador ! para indicar ao 
        //compilador que sabemos que, neste ponto, ele não é null
        keyExtractor={(item) => item.id!} 
        data={lembretes}
        renderItem={
          lembrete => (
            <View
              style={styles.listItem}>
              <Text
                style={styles.listItemText}>
                {lembrete.item.texto}
              </Text>
              <View
                style={styles.listItemButtons}>
                <Pressable
                  onPress={() => remover(lembrete.item)}>
                  <AntDesign  
                    name="delete"
                    size={24}/>
                </Pressable>
                <Pressable
                  onPress={() => {
                      console.log('editando', lembrete.item.id, lembrete.item.texto)
                      setLembrete({id: lembrete.item.id, texto: lembrete.item.texto})
                      setEmModoDeEdicao(true)
                    }
                  }>
                  <AntDesign  
                    name="edit"
                    size={24} />
                </Pressable>
              </View>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 40
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    textAlign: 'center',
    borderRadius: 4
  },
  button: {
    width: '80%',
    backgroundColor: '#0096F3', //material design blue 500
    padding: 12,
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  list: {
    marginTop: 12,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: '#f0f0f0',
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'    
  },
  listItemText:{
    width: '70%',
    textAlign: 'center',
  },
  listItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '30%',
  }
});
